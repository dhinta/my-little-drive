import { createContext } from 'react';
import { Asset } from '../models';

export enum AssetActionType {
  DEFAULT = '',
  RENAME = 'rename',
  EDIT = 'edit',
  DELETE = 'delete',
  MANAGE_TAGS = 'manage-tags',
}

interface AssetAction {
  type: AssetActionType;
  payload: AssetActionsState;
}

interface AssetActionsState {
  asset: Asset;
  name?: string;
  actionType: AssetActionType;
}

export const defaultAssetActionsState: AssetActionsState = {
  asset: {} as Asset,
  name: '',
  actionType: AssetActionType.DEFAULT,
};

export const AssetActionsReducer = (
  state = defaultAssetActionsState,
  action: AssetAction,
): AssetActionsState => {
  switch (action.type) {
    case AssetActionType.RENAME:
      return { ...state, asset: action.payload.asset, actionType: action.type };
    case AssetActionType.EDIT:
      return { ...state, asset: action.payload.asset, actionType: action.type };
    case AssetActionType.DELETE:
      return { ...state, asset: action.payload.asset, actionType: action.type };
    case AssetActionType.MANAGE_TAGS:
      return { ...state, asset: action.payload.asset, actionType: action.type };
    case AssetActionType.DEFAULT:
      return { ...defaultAssetActionsState };
    default:
      return state;
  }
};

export const AssetActionsContext = createContext<{
  state: AssetActionsState;
  dispatch: React.Dispatch<any>;
}>({
  state: defaultAssetActionsState,
  dispatch: () => null,
});
