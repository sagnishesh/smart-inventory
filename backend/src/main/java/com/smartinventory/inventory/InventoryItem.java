package com.smartinventory.inventory;

import java.math.BigDecimal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventory_items")
public class InventoryItem {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String sku;

    private String supplierId;

    private int quantity;

    private int reorderLevel;

    private BigDecimal unitPrice;

    public InventoryItem() {
    }

    public InventoryItem(
        String id,
        String name,
        String sku,
        String supplierId,
        int quantity,
        int reorderLevel,
        BigDecimal unitPrice
    ) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.supplierId = supplierId;
        this.quantity = quantity;
        this.reorderLevel = reorderLevel;
        this.unitPrice = unitPrice;
    }

    public static InventoryItem create(
        String name,
        String sku,
        String supplierId,
        int quantity,
        int reorderLevel,
        BigDecimal unitPrice
    ) {
        return new InventoryItem(null, name, sku, supplierId, quantity, reorderLevel, unitPrice);
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(int reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public boolean needsReorder() {
        return quantity <= reorderLevel;
    }
}

