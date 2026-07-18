import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ContactInput } from '../validators/contactValidator';

export interface ContactSubmission extends ContactInput {
  id: string;
  createdAt: string;
}

const DATA_FILE = path.join(__dirname, '../data/submissions.json');

function readSubmissions(): ContactSubmission[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as ContactSubmission[];
}

function writeSubmissions(submissions: ContactSubmission[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

export class ContactService {
  static async create(data: ContactInput): Promise<ContactSubmission> {
    const submissions = readSubmissions();
    
    const newSubmission: ContactSubmission = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    submissions.push(newSubmission);
    writeSubmissions(submissions);
    
    console.log(`✉️  New contact submission: ${newSubmission.fullName} (${newSubmission.email})`);
    
    return newSubmission;
  }

  static async getAll(): Promise<ContactSubmission[]> {
    return readSubmissions();
  }
}
