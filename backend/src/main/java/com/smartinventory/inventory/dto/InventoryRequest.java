package com.smartinventory.inventory.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record InventoryRequest(
    @NotBlank @Size(max = 120) String name,
    @NotBlank @Size(max = 64) String sku,
    @Size(max = 120) String supplierId,
    @NotNull @Min(0) Integer quantity,
    @NotNull @Min(0) Integer reorderLevel,
    @NotNull @DecimalMin(value = "0.0", inclusive = true) BigDecimal unitPrice
) {
}

