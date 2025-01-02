import { DialogType } from '@/common/models';
import { Button } from '@/vendors/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/vendors/ui/dialog';
import { Input } from '@/vendors/ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
import { FormEvent, useRef, useState } from 'react';

interface Props {
  setOpen: (type: DialogType) => void;
  onSave: (name: string, content: string) => void;
}

const DEFAULT_ASSET_NAME = 'Untitled Note';

export function NewNote({ setOpen, onSave }: Props) {
  const [assetName, setAssetName] = useState(() => DEFAULT_ASSET_NAME);
  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(assetName, ref.current?.innerHTML ?? '');
    setOpen(DialogType.NONE);
  };

  return (
    <Dialog open onOpenChange={() => setOpen(DialogType.NONE)}>
      <DialogContent className="min-w-[750px] min-h-[450px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              <Input
                id="name"
                autoComplete="off"
                value={assetName}
                onChange={e => setAssetName(e.target.value)}
                className="col-span-3 max-w-[500px] font-normal border-0 focus:ring-1 hover:ring-1 shadow-none"
              />
            </DialogTitle>
            <DialogDescription className="sr-only">
              Create a new note
            </DialogDescription>
          </DialogHeader>
          <div
            className="border-dark-grey border-2 p-8 min-h-[400px] outline-none my-4"
            contentEditable
            suppressContentEditableWarning={true}
            ref={ref}
          ></div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => setOpen(DialogType.NONE)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
