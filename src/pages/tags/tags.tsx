import { Tag } from '@/common/models';
import { AddTag } from './add-tag';
import { ListTags } from './list-tags';

import { Separator } from '@/vendors/ui/separator';
import { Tag as TagIcon } from 'lucide-react';

const TAGS: Tag[] = [
  {
    _id: '1',
    name: 'test',
    created_by: '1',
    _creationTime: 1,
    status: 'active',
  },
  {
    _id: '2',
    name: 'test2',
    created_by: '1',
    _creationTime: 1,
    status: 'active',
  },
];

export function Tags() {
  //   const tags = useQuery(api.tags.getTags);

  const tags: Tag[] = TAGS;

  const onEdit = (tag: Tag) => console.log('Edit', tag);
  const onDelete = (tag: Tag) => console.log('Delete', tag);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-blue flex gap-2 items-center">
        <TagIcon size={24} />
        <span>Manage your tags</span>
      </h1>

      <div className="flex flex-col gap-8">
        <AddTag />
        <Separator />
        <ListTags tags={tags} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
