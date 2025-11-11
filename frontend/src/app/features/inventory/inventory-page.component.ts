import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';

import { InventoryItem, InventoryRequestPayload } from '../../core/types/inventory.model';
import { inventoryActions } from '../../store/inventory/inventory.actions';
import {
  selectInventoryError,
  selectInventoryItems,
  selectInventoryLoading,
  selectInventoryProcessing
} from '../../store/inventory/inventory.selectors';
import { InventoryFormDialogComponent, InventoryDialogData } from './inventory-form-dialog.component';
import { firstValueFrom } from 'rxjs';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { UserRole } from '../../core/types/user.model';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss'
})
export class InventoryPageComponent {

  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  readonly items = this.store.selectSignal(selectInventoryItems);
  readonly loading = this.store.selectSignal(selectInventoryLoading);
  readonly processing = this.store.selectSignal(selectInventoryProcessing);
  readonly error = this.store.selectSignal(selectInventoryError);

  readonly currentUser = this.store.selectSignal(selectAuthUser);
  readonly role = computed<UserRole>(() => this.currentUser()?.role ?? 'STAFF');
  readonly canDelete = computed(() => this.role() === 'ADMIN');

  readonly filter = signal('');
  readonly displayedColumns = ['name', 'sku', 'supplier', 'quantity', 'price', 'status', 'actions'];

  readonly filteredItems = computed(() => {
    const query = this.filter().trim().toLowerCase();
    if (!query) {
      return this.items();
    }
    return this.items().filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        (item.supplierId ?? '').toLowerCase().includes(query)
      );
    });
  });

  constructor() {
    this.store.dispatch(inventoryActions.loadItems());
  }

  trackById(_: number, item: InventoryItem): string {
    return item.id;
  }

  openCreateDialog(): void {
    this.openDialog({
      title: 'Add inventory item',
      role: this.role()
    }).then((payload) => {
      if (payload) {
        this.store.dispatch(inventoryActions.createItem({ payload }));
      }
    });
  }

  openEditDialog(item: InventoryItem): void {
    this.openDialog({
      title: 'Edit inventory item',
      item,
      role: this.role()
    }).then((payload) => {
      if (payload) {
        this.store.dispatch(inventoryActions.updateItem({ id: item.id, payload }));
      }
    });
  }

  deleteItem(item: InventoryItem): void {
    const confirmed = window.confirm(`Remove "${item.name}" (${item.sku}) from inventory?`);
    if (confirmed) {
      this.store.dispatch(inventoryActions.deleteItem({ id: item.id }));
    }
  }

  private async openDialog(data: InventoryDialogData): Promise<InventoryRequestPayload | null> {
    const dialogRef = this.dialog.open(InventoryFormDialogComponent, {
      data,
      disableClose: true
    });
    return firstValueFrom(dialogRef.afterClosed());
  }
}

