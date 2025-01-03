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
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useMutation } from 'convex/react';
import { FormEvent, useRef, useState } from 'react';

interface Props {
  setOpen: (type: DialogType) => void;
}

export function NewDocument({ setOpen }: Props) {
  const [assetName, setAssetName] = useState<File | null>(null);
  const generateUploadUrl = useMutation(api.assets.generateUploadUrl);
  const uploadDocument = useMutation(api.assets.addDocument);
  const ref = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': assetName!.type },
      body: assetName,
    });
    const { storageId } = (await result.json()) as {
      storageId: Id<'_storage'>;
    };
    // Step 3: Save the newly allocated storage id to the database
    await uploadDocument({ fileId: storageId, name: assetName!.name });

    setAssetName(null);
    ref.current!.value = '';
    setOpen(DialogType.NONE);
  }

  return (
    <Dialog open onOpenChange={() => setOpen(DialogType.NONE)}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Document</DialogTitle>
            <DialogDescription className="sr-only">
              Upload a new document
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
                ref={ref}
                onChange={event => setAssetName(event.target.files![0])}
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
            <Button disabled={!assetName}>Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
