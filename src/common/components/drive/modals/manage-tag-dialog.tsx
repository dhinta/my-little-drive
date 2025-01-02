import {
  AssetActionsContext,
  AssetActionType,
} from '@/common/context/asset-actions-context';
import { Asset } from '@/common/models';
import { Badge } from '@/vendors/ui/badge';
import { Button } from '@/vendors/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/vendors/ui/dialog';
import { CircleX } from 'lucide-react';
import { useContext } from 'react';

interface Props {
  asset: Asset;
}

export function ManageTagDialog({ asset }: Props) {
  const { dispatch } = useContext(AssetActionsContext);
  const onSubmit = () => {};
  return (
    <Dialog
      open
      onOpenChange={() => dispatch({ type: AssetActionType.DEFAULT })}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
          <DialogDescription>Manage tag for {asset.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* <div className="flex items-center">
              <Label htmlFor="name" className="text-right sr-only">
                Tags
              </Label>
              <Input id="name" autoComplete="off" className="col-span-3" />
            </div> */}

            <div className="flex gap-2">
              {asset.tags?.map(tag => (
                <Badge key={tag.tag_id} className="text-lg px-4">
                  {tag.name} <CircleX size={20} className="ml-2" />{' '}
                </Badge>
              ))}
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
