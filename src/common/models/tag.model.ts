import { Id } from '@convex/_generated/dataModel';

export interface Tag {
  _id: Id<'tags'>;
  name: string;
  created_by: string;
  _creationTime: number;
  status: 'active' | 'deleted';
}
