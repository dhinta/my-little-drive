import { useEscapeKeyPress, useOutsideClick } from '@/common/hooks';
import { Button } from '@/vendors/ui/button';
import { Input } from '@/vendors/ui/input';
import { useRef, useState } from 'react';

export function AddTag() {
  const [addMode, setAddMode] = useState(false);
  const [tagName, setTagName] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  const cancelAddMode = () => {
    setAddMode(false);
    setTagName('');
  };

  useEscapeKeyPress(ref, cancelAddMode);
  useOutsideClick(ref, cancelAddMode);

  return (
    <div ref={ref}>
      {!addMode ? (
        <Button
          className="w-[200px]"
          onClick={e => {
            e.stopPropagation();
            setAddMode(true);
          }}
        >
          Add Tag
        </Button>
      ) : (
        <div className="flex items-center gap-4">
          <Input
            autoFocus
            value={tagName}
            onChange={e => setTagName(e.target.value)}
            type="text"
            className="w-[250px] py-4 text-xl font-bold text-muted-foreground hover:ring-1 outline-ring-1 outline-theme-blue rounded-md"
          />
          <Button className="py-4">Save</Button>
          <Button
            variant="secondary"
            type="button"
            className="py-4"
            onClick={cancelAddMode}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
