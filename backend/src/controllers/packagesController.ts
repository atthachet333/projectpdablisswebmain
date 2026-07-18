import { Request, Response } from 'express';
import { PackagesService } from '../services/packagesService';

export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const locale = req.acceptsLanguages('en', 'th') === 'en' ? 'en' : 'th';
    const rawPackages = await PackagesService.getAll();
    const packages = rawPackages.map((p: any) => ({
      ...p,
      name: p.name[locale],
      currency: p.currency[locale],
      period: p.period[locale],
      description: p.description[locale],
      badge: p.badge ? p.badge[locale] : null,
      features: p.features[locale],
      cta: p.cta[locale]
    }));
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแพ็กเกจ' });
  }
};
