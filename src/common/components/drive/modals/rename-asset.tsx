import {
  AssetActionsContext,
  AssetActionType,
} from '@/common/context/asset-actions-context';
import { Asset } from '@/common/models';
import { Button } from '@/vendors/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/vendors/ui/dialog';
import { Input } from '@/vendors/ui/input';
import { Label } from '@/vendors/ui/label';
import { api } from '@convex/_generated/api';
import { useMutation } from 'convex/react';
import { FormEvent, useContext, useState } from 'react';

interface Props {
  asset: Asset;
}

export function RenameAsset({ asset }: Props) {
  const [assetName, setAssetName] = useState(asset.name);
  const { dispatch } = useContext(AssetActionsContext);
  const update = useMutation(api.assets.updateAssetName);
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await update({ _id: asset._id, name: assetName });
    dispatch({ type: AssetActionType.DEFAULT });
  };
  return (
    <Dialog
      open
      onOpenChange={() => dispatch({ type: AssetActionType.DEFAULT })}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Asset</DialogTitle>
          <DialogDescription>Rename asset {asset.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center">
              <Label htmlFor="name" className="text-right sr-only">
                Tags
              </Label>
              <Input
                value={assetName}
                onChange={e => setAssetName(e.target.value)}
                id="name"
                autoComplete="off"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => dispatch({ type: AssetActionType.DEFAULT })}
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
