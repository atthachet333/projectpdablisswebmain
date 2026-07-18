import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร')
    .max(100, 'ชื่อ-นามสกุลยาวเกินไป')
    .trim(),
  companyName: z
    .string()
    .max(200, 'ชื่อบริษัทยาวเกินไป')
    .trim()
    .optional()
    .default(''),
  email: z
    .string()
    .email('รูปแบบอีเมลไม่ถูกต้อง')
    .max(200, 'อีเมลยาวเกินไป')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{8,20}$/, 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')
    .trim(),
  subject: z
    .string()
    .min(1, 'กรุณาเลือกหัวข้อ')
    .max(200, 'หัวข้อยาวเกินไป')
    .trim(),
  service: z
    .string()
    .max(200, 'บริการยาวเกินไป')
    .trim()
    .optional()
    .default(''),
  message: z
    .string()
    .min(10, 'กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร')
    .max(5000, 'รายละเอียดยาวเกินไป')
    .trim(),
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, 'กรุณายอมรับนโยบายความเป็นส่วนตัว'),
});

export type ContactInput = z.infer<typeof contactSchema>;
