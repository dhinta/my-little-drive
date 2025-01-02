import {
  AssetActionsContext,
  AssetActionsReducer,
  AssetActionType,
  defaultAssetActionsState,
} from '@/common/context/asset-actions-context';
import { Asset, User } from '@/common/models';

import { LayoutGrid, LayoutList } from 'lucide-react';
import { useReducer, useState } from 'react';
import { DriveGridView } from './grid-view';
import { DriveListView } from './list-view';
import { ManageTagDialog } from './modals/manage-tag-dialog';

interface Props {
  assets: Asset[];
  user: User;
}

enum View {
  LIST = 'list',
  GRID = 'grid',
}

export enum AssetActionModalType {
  NONE = 'none',
  RENAME = 'rename',
  EDIT = 'edit',
  DELETE = 'delete',
  MANAGE_TAGS = 'manage-tags',
}

export function Drive({ assets, user }: Props) {
  const [view, setView] = useState<View>(View.LIST);
  const [assetActionState, dispatch] = useReducer(
    AssetActionsReducer,
    defaultAssetActionsState,
  );

  console.log(assetActionState);

  const manageTagDialog = assetActionState.actionType ===
    AssetActionType.MANAGE_TAGS && (
    <ManageTagDialog asset={assetActionState.asset} />
  );

  return (
    <AssetActionsContext.Provider value={{ state: assetActionState, dispatch }}>
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setView(View.LIST)}
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100  focus:z-10 focus:text-theme-blue dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-theme-blue dark:focus:text-white ${view === View.LIST ? 'bg-gray-100 text-theme-blue' : ''}`}
            >
              <LayoutList size={20} />
            </button>
            <button
              type="button"
              onClick={() => setView(View.GRID)}
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100  focus:z-10 focus:text-theme-blue dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-theme-blue dark:focus:text-white ${view === View.GRID ? 'bg-gray-100 text-theme-blue' : ''}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        <>
          {view === View.LIST ? (
            <DriveListView assets={assets} user={user} />
          ) : (
            <DriveGridView assets={assets} user={user} />
          )}
        </>
      </div>
      {manageTagDialog}
    </AssetActionsContext.Provider>
  );
}
