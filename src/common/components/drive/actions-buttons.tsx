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
  Trash,
  UserPlus,
} from 'lucide-react';

export function ActionsButtons() {
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
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Download size={16} /> Download
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Copy size={16} /> Make a copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <FolderPen size={16} /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Trash size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
