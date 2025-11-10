import { createFeature, createReducer, on } from '@ngrx/store';

import { InventoryItem } from '../../core/types/inventory.model';
import { inventoryActions } from './inventory.actions';

export interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  processing: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  processing: false,
  error: null
};

export const inventoryFeature = createFeature({
  name: 'inventory',
  reducer: createReducer(
    initialState,
    on(inventoryActions.loadItems, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(inventoryActions.loadItemsSuccess, (state, { items }) => ({
      ...state,
      items,
      loading: false,
      error: null
    })),
    on(inventoryActions.loadItemsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(
      inventoryActions.createItem,
      inventoryActions.updateItem,
      inventoryActions.deleteItem,
      (state) => ({
        ...state,
        processing: true,
        error: null
      })
    ),

    on(inventoryActions.createItemSuccess, (state, { item }) => ({
      ...state,
      items: [...state.items, item],
      processing: false
    })),
    on(inventoryActions.updateItemSuccess, (state, { item }) => ({
      ...state,
      items: state.items.map((existing) => (existing.id === item.id ? item : existing)),
      processing: false
    })),
    on(inventoryActions.deleteItemSuccess, (state, { id }) => ({
      ...state,
      items: state.items.filter((item) => item.id !== id),
      processing: false
    })),
    on(
      inventoryActions.createItemFailure,
      inventoryActions.updateItemFailure,
      inventoryActions.deleteItemFailure,
      (state, { error }) => ({
        ...state,
        processing: false,
        error
      })
    ),
    on(inventoryActions.clearError, (state) => ({
      ...state,
      error: null
    }))
  )
});

