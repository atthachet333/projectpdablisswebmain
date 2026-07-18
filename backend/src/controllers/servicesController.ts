import { Request, Response } from 'express';
import { ServicesService } from '../services/servicesService';

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const locale = req.acceptsLanguages('en', 'th') === 'en' ? 'en' : 'th';
    const rawServices = await ServicesService.getAll();
    const services = rawServices.map((s: any) => ({
      ...s,
      title: s.title[locale],
      shortTitle: s.shortTitle[locale],
      description: s.description[locale],
      features: s.features[locale]
    }));
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลบริการ' });
  }
};
