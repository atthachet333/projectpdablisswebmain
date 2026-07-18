import { Request, Response } from 'express';
import { FaqsService } from '../services/faqsService';

export const getFaqs = async (req: Request, res: Response): Promise<void> => {
  try {
    const locale = req.acceptsLanguages('en', 'th') === 'en' ? 'en' : 'th';
    const rawFaqs = await FaqsService.getAll();
    const faqs = rawFaqs.map((f: any) => ({
      ...f,
      question: f.question[locale],
      answer: f.answer[locale]
    }));
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล FAQ' });
  }
};
