package com.smartinventory.inventory;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepository extends MongoRepository<InventoryItem, String> {
    boolean existsBySkuIgnoreCase(String sku);
    Optional<InventoryItem> findBySkuIgnoreCase(String sku);
}

