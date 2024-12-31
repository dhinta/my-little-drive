import { Tag, User } from '@/common/models';
import { Alert, AlertDescription } from '@/vendors/ui/alert';
import { AddTag } from './add-tag';
import { ListTags } from './list-tags';

import { Loader } from '@/common/components';
import { getErrorMessage } from '@/common/utils';
import { useToast } from '@/vendors/hooks/use-toast';
import { Separator } from '@/vendors/ui/separator';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { AlertCircle, Tag as TagIcon } from 'lucide-react';
import { useState } from 'react';

enum Action {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  NONE = 'none',
}

export function Tags() {
  // TODO: Add load more

  const [inProgressAction, setInProgressAction] = useState<Action>(Action.NONE);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const tags = useQuery(api.tags.list) as Tag[];
  const user = useQuery(api.users.getCurrentUser) as {
    _id: Id<'users'>;
  } & User;
  const save = useMutation(api.tags.add).withOptimisticUpdate(
    (old, newTag) => ({
      ...old,
      ...newTag,
    }),
  );
  const remove = useMutation(api.tags.remove);
  const update = useMutation(api.tags.update);

  if (!tags || !user) return <Loader />;

  const onEdit = async (tag: Tag) => {
    setInProgressAction(Action.EDIT);
    try {
      await update({ _id: tag._id, name: tag.name });
      toast({
        description: 'Successfully updated tag',
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setInProgressAction(Action.NONE);
    }
  };
  const onDelete = async (tag: Tag) => {
    setInProgressAction(Action.DELETE);
    try {
      await remove({ _id: tag._id });
      toast({
        description: 'Tag removed successfully',
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setInProgressAction(Action.NONE);
    }
  };
  const onSave = async (name: string) => {
    setInProgressAction(Action.ADD);
    try {
      await save({ name, created_by: user._id, status: 'active' });
      toast({
        description: 'New tag added successfully',
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setInProgressAction(Action.NONE);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-theme-blue flex gap-2 items-center">
        <TagIcon size={24} />
        <span>Manage your tags</span>
      </h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-8">
        <AddTag
          onSave={onSave}
          inProgressAdd={inProgressAction === Action.ADD}
        />
        <Separator />
        <ListTags
          tags={tags}
          onEdit={onEdit}
          onDelete={onDelete}
          inProgressEdit={inProgressAction === Action.EDIT}
          inProgressDelete={inProgressAction === Action.DELETE}
        />
      </div>
    </div>
  );
}
