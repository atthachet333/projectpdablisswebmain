import testimonialsData from '../data/testimonials.json';

export class TestimonialsService {
  static async getAll() {
    return testimonialsData;
  }
}
