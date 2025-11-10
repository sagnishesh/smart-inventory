package com.smartinventory.inventory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.smartinventory.inventory.dto.InventoryRequest;
import com.smartinventory.inventory.dto.InventoryResponse;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryRepository repository;

    @InjectMocks
    private InventoryService service;

    private InventoryRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleRequest = new InventoryRequest(
            "Thermal Label Printer",
            "PRN-001",
            "SUP-9",
            12,
            4,
            new BigDecimal("249.95")
        );
    }

    @Test
    void create_shouldPersistNewItem() {
        when(repository.existsBySkuIgnoreCase("prn-001")).thenReturn(false);
        when(repository.save(any())).thenAnswer(invocation -> {
            InventoryItem entity = invocation.getArgument(0);
            return new InventoryItem(
                "generated-id",
                entity.getName(),
                entity.getSku(),
                entity.getSupplierId(),
                entity.getQuantity(),
                entity.getReorderLevel(),
                entity.getUnitPrice()
            );
        });

        InventoryResponse response = service.create(sampleRequest);

        assertThat(response.id()).isEqualTo("generated-id");
        assertThat(response.needsReorder()).isFalse();
        assertThat(response.sku()).isEqualTo("prn-001");

        ArgumentCaptor<InventoryItem> captor = ArgumentCaptor.forClass(InventoryItem.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getSku()).isEqualTo("prn-001");
    }

    @Test
    void create_shouldRejectDuplicateSku() {
        when(repository.existsBySkuIgnoreCase(anyString())).thenReturn(true);

        assertThatThrownBy(() -> service.create(sampleRequest))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("SKU already exists");

        verify(repository, never()).save(any());
    }

    @Test
    void update_shouldMutateExistingItem() {
        InventoryItem existing = InventoryItem.create(
            "Original",
            "prn-001",
            null,
            10,
            3,
            new BigDecimal("100.00")
        );
        when(repository.findById("item-1")).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        InventoryResponse updated = service.update("item-1", sampleRequest);

        assertThat(updated.name()).isEqualTo("Thermal Label Printer");
        assertThat(updated.needsReorder()).isFalse();
    }

    @Test
    void update_shouldThrowWhenNotFound() {
        when(repository.findById("missing")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update("missing", sampleRequest))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("Inventory item not found");
    }

    @Test
    void delete_shouldRequireExistingRecord() {
        when(repository.existsById("missing")).thenReturn(false);

        assertThatThrownBy(() -> service.delete("missing"))
            .isInstanceOf(ResponseStatusException.class)
            .hasMessageContaining("Inventory item not found");
    }
}

