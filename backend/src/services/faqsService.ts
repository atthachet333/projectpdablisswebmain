import faqsData from '../data/faqs.json';

export class FaqsService {
  static async getAll() {
    return faqsData;
  }
}
