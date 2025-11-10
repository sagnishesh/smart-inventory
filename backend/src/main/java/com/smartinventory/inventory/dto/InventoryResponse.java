package com.smartinventory.inventory.dto;

import java.math.BigDecimal;

import com.smartinventory.inventory.InventoryItem;

public record InventoryResponse(
    String id,
    String name,
    String sku,
    String supplierId,
    int quantity,
    int reorderLevel,
    BigDecimal unitPrice,
    boolean needsReorder
) {

    public static InventoryResponse fromEntity(InventoryItem item) {
        return new InventoryResponse(
            item.getId(),
            item.getName(),
            item.getSku(),
            item.getSupplierId(),
            item.getQuantity(),
            item.getReorderLevel(),
            item.getUnitPrice(),
            item.needsReorder()
        );
    }
}

