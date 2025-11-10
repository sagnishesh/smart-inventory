package com.smartinventory.inventory;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.smartinventory.inventory.dto.InventoryRequest;
import com.smartinventory.inventory.dto.InventoryResponse;

@Service
public class InventoryService {

    private final InventoryRepository repository;

    public InventoryService(InventoryRepository repository) {
        this.repository = repository;
    }

    public List<InventoryResponse> findAll() {
        return repository.findAll()
            .stream()
            .map(InventoryResponse::fromEntity)
            .toList();
    }

    @Transactional
    public InventoryResponse create(InventoryRequest request) {
        String sku = request.sku().trim().toLowerCase();
        if (repository.existsBySkuIgnoreCase(sku)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "SKU already exists");
        }

        InventoryItem item = InventoryItem.create(
            request.name().trim(),
            sku,
            normalizeSupplier(request.supplierId()),
            request.quantity(),
            request.reorderLevel(),
            request.unitPrice()
        );

        return InventoryResponse.fromEntity(repository.save(item));
    }

    @Transactional
    public InventoryResponse update(String id, InventoryRequest request) {
        InventoryItem item = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventory item not found"));

        String newSku = request.sku().trim().toLowerCase();
        if (!item.getSku().equalsIgnoreCase(newSku) && repository.existsBySkuIgnoreCase(newSku)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "SKU already exists");
        }

        item.setName(request.name().trim());
        item.setSku(newSku);
        item.setSupplierId(normalizeSupplier(request.supplierId()));
        item.setQuantity(request.quantity());
        item.setReorderLevel(request.reorderLevel());
        item.setUnitPrice(request.unitPrice());

        return InventoryResponse.fromEntity(repository.save(item));
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Inventory item not found");
        }
        repository.deleteById(id);
    }

    private String normalizeSupplier(String supplierId) {
        if (supplierId == null) {
            return null;
        }
        String trimmed = supplierId.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}

