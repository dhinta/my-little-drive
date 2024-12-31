import { useEscapeKeyPress, useOutsideClick } from '@/common/hooks';
import { Tag } from '@/common/models';
import { Button } from '@/vendors/ui/button';
import { Input } from '@/vendors/ui/input';
import { Pencil, Tag as TagIcon, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  tags: Tag[];
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
  inProgressEdit: boolean;
  inProgressDelete: boolean;
}

export function ListTags({
  tags,
  onEdit,
  onDelete,
  inProgressEdit,
  inProgressDelete,
}: Props) {
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [editModeName, setEditModeName] = useState('');
  const ref = useRef<HTMLUListElement>(null);
  const isChangesInProgress = inProgressEdit || inProgressDelete;

  const onEditTagClick = (index: number, tag: Tag) => {
    setEditModeName(tag.name);
    setEditModeIndex(index);
  };

  const onCancelEdit = () => {
    setEditModeIndex(-1);
    setEditModeName('');
  };

  const onEditTag = (tag: Tag) => {
    setEditModeIndex(-1);
    setEditModeName('');
    onEdit({
      ...tag,
      name: editModeName,
    });
  };

  const onDeleteTag = (tag: Tag) => {
    setEditModeIndex(-1);
    setEditModeName('');
    onDelete({
      ...tag,
      status: 'deleted',
    });
  };

  useEscapeKeyPress(ref, onCancelEdit);
  useOutsideClick(ref, onCancelEdit);

  return (
    <ul className="w-[300px]" ref={ref}>
      {tags.map((tag, index) => (
        <li
          key={tag._id}
          className={`flex justify-between mb-6 ${isChangesInProgress ? 'opacity-40 pointer-events-none' : ''}`}
        >
          {editModeIndex !== index ? (
            <div
              tabIndex={0}
              onDoubleClick={() => onEditTagClick(index, tag)}
              className="flex items-center gap-2 w-[250px] text-xl font-bold text-muted-foreground hover:ring-1 outline-ring-1 outline-theme-blue rounded-md"
            >
              <TagIcon size={16} /> {tag.name}
            </div>
          ) : (
            <Input
              autoFocus
              value={editModeName}
              onChange={e => setEditModeName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  onEditTag(tag);
                }
              }}
              type="text"
              className="w-[250px] py-4 text-xl font-bold text-muted-foreground hover:ring-1 outline-ring-1 outline-theme-blue rounded-md"
            />
          )}
          <div className="flex gap-2 items-center ml-2">
            {editModeIndex !== index ? (
              <>
                <Button
                  variant="ghost"
                  className="px-1 hover:bg-inherit hover:text-theme-blue"
                  onClick={() => onEditTagClick(index, tag)}
                >
                  <Pencil size={20} />
                </Button>
                <Button
                  variant="ghost"
                  className="px-1 hover:bg-inherit hover:text-theme-blue"
                  onClick={() => onDeleteTag(tag)}
                >
                  <Trash2 size={20} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={isChangesInProgress || !editModeName}
                  onClick={() => onEditTag(tag)}
                >
                  Save
                </Button>
                <Button variant="secondary" onClick={onCancelEdit}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
