export interface File {
  id: string;
  name: string;
  tags?: string[];
  type: FileType;
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

export const FileTypeMap: Record<FileType, string> = {
  [FileType.TEXT]: 'Text',
  [FileType.IMAGE_JPEG]: 'Jpeg',
  [FileType.DOCUMENT]: 'Word Document',
  [FileType.PDF]: 'Pdf',
} as const;
