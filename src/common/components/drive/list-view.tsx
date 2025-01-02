import { Asset, FileTypeMap, User } from '@/common/models';
import { Badge } from '@/vendors/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/vendors/ui/table';
import { CircleUserRound } from 'lucide-react';
import { DisplayDate } from '../display-date/display-date';
import { ActionsButtons } from './actions-buttons';

interface Props {
  assets: Asset[];
  user: User;
}

export function DriveListView({ assets, user }: Props) {
  return (
    <Table>
      <TableCaption>
        <span className="sr-only">A list of your assets.</span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Name</TableHead>
          <TableHead className="py-4">Tags</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Created/Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map(asset => (
          <TableRow key={asset._id}>
            <TableCell className="font-medium w-1/7">{asset.name}</TableCell>
            <TableCell className="w-1/7">
              <div className="flex gap-2">
                {asset.tags?.map(tag => (
                  <Badge variant="outline" key={tag.tag_id}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="w-1/7">
              {asset.docType ? FileTypeMap[asset.docType] : asset.type}
            </TableCell>
            <TableCell className="w-1/7">
              {user.image ? (
                <img
                  src={user.image}
                  alt="avatar"
                  className="w-6 h-6 mr-2 rounded-full"
                />
              ) : (
                <CircleUserRound size={20} />
              )}
            </TableCell>
            <TableCell className="w-1/7">{asset.size}</TableCell>
            <TableCell className="text-right w-1/7">
              <DisplayDate date={asset._creationTime} />
            </TableCell>
            <TableCell className="w-1/7 flex justify-end items-center py-4">
              <ActionsButtons asset={asset} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="py-4">
            Total assets
          </TableCell>
          <TableCell className="text-right">{assets.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
