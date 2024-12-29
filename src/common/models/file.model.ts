export interface File {
  id: string;
  name: string;
  description?: string;
  type: string;
  size: number;
  date: Date;
  url: string;
}

export enum FileType {
  TEXT = 'text/plain',
  IMAGE_JPEG = 'image/jpeg',
  DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  PDF = 'application/pdf',
}

export enum DialogType {
  NONE = 'none',
  FOLDER = 'folder',
  NOTE = 'note',
  DOCUMENT = 'document',
}

export const ALT_C = 'ALT-C';
