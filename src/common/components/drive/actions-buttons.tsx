import { AssetActionsContext, AssetActionType } from '@/common/context';
import { Asset, AssetType } from '@/common/models';
import { Button } from '@/vendors/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/vendors/ui/dropdown-menu';
import {
  Copy,
  Download,
  EllipsisVertical,
  FolderPen,
  TagIcon,
  Trash,
  UserPlus,
} from 'lucide-react';
import { useContext } from 'react';

interface Props {
  asset: Asset;
}

export function ActionsButtons({ asset }: Props) {
  const btnClassName = 'p-0 hover:bg-transparent h-full';
  const { dispatch } = useContext(AssetActionsContext);
  const isFolder = asset.type === AssetType.FOLDER;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <UserPlus size={16} /> Share with
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant="ghost"
              className={btnClassName}
              onClick={() =>
                dispatch({
                  type: AssetActionType.MANAGE_TAGS,
                  payload: { asset },
                })
              }
            >
              <TagIcon size={16} /> Manage Tags
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Download size={16} /> Download
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant="ghost"
              className={btnClassName}
              disabled={isFolder}
            >
              <Copy size={16} /> Make a copy
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant="ghost"
              className={btnClassName}
              onClick={() =>
                dispatch({
                  type: AssetActionType.RENAME,
                  payload: { asset },
                })
              }
            >
              <FolderPen size={16} /> Rename
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Button
              variant="ghost"
              className={btnClassName}
              disabled={isFolder}
            >
              <Trash size={16} /> Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
