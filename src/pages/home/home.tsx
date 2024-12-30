import { Drive, Loader } from '@/common/components';
import { File, FileType, User } from '@/common/models';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
import { WelcomeMessage } from './welcome-message';

const files: File[] = [
  {
    id: '1',
    name: 'test.txt',
    tags: ['test', 'example'],
    type: FileType.TEXT,
    size: 123,
    date: new Date(),
    url: 'https://example.com/test.txt',
  },
  {
    id: '2',
    name: 'image.jpg',
    tags: ['image', 'photo'],
    type: FileType.IMAGE_JPEG,
    size: 456,
    date: new Date(),
    url: 'https://example.com/image.jpg',
  },
  {
    id: '3',
    name: 'document.docx',
    tags: ['document', 'example'],
    type: FileType.DOCUMENT,
    size: 789,
    date: new Date(),
    url: 'https://example.com/document.docx',
  },
  {
    id: '4',
    name: 'presentation.pdf',
    type: FileType.PDF,
    size: 7890,
    date: new Date(),
    url: 'https://example.com/presentation.pdf',
  },
];

export function Home(): JSX.Element {
  const user = useQuery(api.users.getCurrentUser) as User;
  const hasData = !!files.length;

  if (!user) return <Loader />;

  return hasData ? (
    <Drive files={files} user={user} />
  ) : (
    <WelcomeMessage name={user?.name} />
  );
}
