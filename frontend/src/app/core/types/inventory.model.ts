export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  supplierId: string | null;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
  needsReorder: boolean;
}

export interface InventoryRequestPayload {
  name: string;
  sku: string;
  supplierId?: string | null;
  quantity: number;
  reorderLevel: number;
  unitPrice: number;
}

