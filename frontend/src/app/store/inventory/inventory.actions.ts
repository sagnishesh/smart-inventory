import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { InventoryItem, InventoryRequestPayload } from '../../core/types/inventory.model';

export const inventoryActions = createActionGroup({
  source: 'Inventory',
  events: {
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: InventoryItem[] }>(),
    'Load Items Failure': props<{ error: string }>(),

    'Create Item': props<{ payload: InventoryRequestPayload }>(),
    'Create Item Success': props<{ item: InventoryItem }>(),
    'Create Item Failure': props<{ error: string }>(),

    'Update Item': props<{ id: string; payload: InventoryRequestPayload }>(),
    'Update Item Success': props<{ item: InventoryItem }>(),
    'Update Item Failure': props<{ error: string }>(),

    'Delete Item': props<{ id: string }>(),
    'Delete Item Success': props<{ id: string }>(),
    'Delete Item Failure': props<{ error: string }>(),

    'Clear Error': emptyProps()
  }
});

