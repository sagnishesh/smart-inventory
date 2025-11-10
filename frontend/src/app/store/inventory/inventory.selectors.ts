import { inventoryFeature } from './inventory.reducer';

export const selectInventoryState = inventoryFeature.selectInventoryState;
export const selectInventoryItems = inventoryFeature.selectItems;
export const selectInventoryLoading = inventoryFeature.selectLoading;
export const selectInventoryProcessing = inventoryFeature.selectProcessing;
export const selectInventoryError = inventoryFeature.selectError;

