import { Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import { contactSchema } from '../validators/contactValidator';
import { ZodError } from 'zod';

const languageOf = (req: Request) => req.acceptsLanguages('en', 'th') === 'en' ? 'en' : 'th';
const messages = {
  th: { success: 'ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด', invalid: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง', error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' },
  en: { success: 'Your request has been submitted. Our team will contact you shortly.', invalid: 'Some information is invalid. Please review the form and try again.', error: 'We could not submit your request. Please try again.' },
};

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  const locale = languageOf(req);
  try {
    const validatedData = contactSchema.parse(req.body);
    const submission = await ContactService.create(validatedData);
    res.status(201).json({ success: true, message: messages[locale].success, data: { id: submission.id } });
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((issue) => { fieldErrors[String(issue.path[0])] = issue.message; });
      res.status(400).json({ success: false, code: 'VALIDATION_ERROR', message: messages[locale].invalid, errors: fieldErrors });
      return;
    }
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, code: 'SUBMISSION_ERROR', message: messages[locale].error });
  }
};
