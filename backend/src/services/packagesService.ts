import packagesData from '../data/packages.json';

export class PackagesService {
  static async getAll() {
    return packagesData;
  }
}
