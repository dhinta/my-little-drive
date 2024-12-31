import { Id } from '@convex/_generated/dataModel';
import { User } from './user.model';

export enum AssetType {
  NOTE = 'note',
  DOCUMENT = 'document',
  FOLDER = 'folder',
}

export interface Asset {
  _id: Id<'assets'>;
  name: string;
  content?: string;
  path?: string;
  type: AssetType;
  docType?: FileType;
  size: number;
  created_by: Id<'users'>;
  _creationTime: number;
  status: 'active' | 'deleted';
  parent?: string;
  tags?: { name: string; tag_id: Id<'tags'> }[];
  users?: Pick<User, '_id' | 'name' | 'email' | 'image'>[];
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
