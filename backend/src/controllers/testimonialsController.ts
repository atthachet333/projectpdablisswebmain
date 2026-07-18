import { Request, Response } from 'express';
import { TestimonialsService } from '../services/testimonialsService';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const locale = req.acceptsLanguages('en', 'th') === 'en' ? 'en' : 'th';
    const rawTestimonials = await TestimonialsService.getAll();
    const testimonials = rawTestimonials.map((t: any) => ({
      ...t,
      name: t.name[locale],
      company: t.company[locale],
      position: t.position[locale],
      text: t.text[locale],
      initials: t.initials[locale]
    }));
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรีวิว' });
  }
};
