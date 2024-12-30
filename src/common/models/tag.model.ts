export interface Tag {
  _id: string;
  name: string;
  created_by: string;
  _creationTime: number;
  status: 'active' | 'deleted';
}
