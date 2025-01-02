import preview from '@/assets/preview.png';
import { Asset, User } from '@/common/models';
import { Badge } from '@/vendors/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/vendors/ui/card';
import { CircleUserRound } from 'lucide-react';
import { DisplayDate } from '../display-date/display-date';
import { ActionsButtons } from './actions-buttons';

interface Props {
  assets: Asset[];
  user: User;
}

export function DriveGridView({ assets, user }: Props) {
  return (
    <div className="flex flex-wrap">
      {assets.map(asset => (
        <Card className="w-[350px] mr-4 mb-4" key={asset._id}>
          <CardHeader className="py-4">
            <CardTitle className="flex items-center justify-between">
              <span>{asset.name}</span>
              <ActionsButtons asset={asset} />
            </CardTitle>
            <CardDescription className="flex gap-2">
              {asset.tags?.map(tag => (
                <Badge key={tag.tag_id} variant="outline">
                  {tag.name}
                </Badge>
              ))}
              &nbsp;
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full bg-theme-dark-grey rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                  ) : (
                    <CircleUserRound size={20} />
                  )}
                  {user.name} created
                </span>
                <span className="text-sm text-muted-foreground">
                  <DisplayDate date={asset._creationTime} />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
