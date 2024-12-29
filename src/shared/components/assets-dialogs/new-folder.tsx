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
import { Label } from '@/vendors/ui/label';
import { DialogDescription } from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';

interface Props {
  setOpen: (type: DialogType) => void;
  onSave: (name: string) => void;
}

export function NewFolder({ setOpen, onSave }: Props) {
  const [assetName, setAssetName] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(assetName);
    setOpen(DialogType.NONE);
  };
  return (
    <Dialog open onOpenChange={() => setOpen(DialogType.NONE)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new folder
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center">
              <Label htmlFor="name" className="text-right sr-only">
                Create New Folder
              </Label>
              <Input
                id="name"
                autoComplete="off"
                value={assetName}
                onChange={e => setAssetName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => setOpen(DialogType.NONE)}
            >
              Cancel
            </Button>
            <Button disabled={!assetName} type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
