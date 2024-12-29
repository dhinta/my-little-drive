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

interface Props {
  setOpen: (type: DialogType) => void;
  assetName: string;
  setAssetName: (assetName: string) => void;
}

export function NewDocument({ setOpen, assetName, setAssetName }: Props) {
  return (
    <Dialog open onOpenChange={() => setOpen(DialogType.NONE)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Document</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center">
            <Label htmlFor="name" className="text-right sr-only">
              Upload New Document
            </Label>
            <Input
              type="file"
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
            variant="secondary"
            className="mr-4"
            onClick={() => setOpen(DialogType.NONE)}
          >
            Cancel
          </Button>
          <Button disabled={!assetName}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
