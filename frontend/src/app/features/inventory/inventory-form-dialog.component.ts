import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { InventoryItem, InventoryRequestPayload } from '../../core/types/inventory.model';

export interface InventoryDialogData {
  title: string;
  item?: InventoryItem;
}

@Component({
  selector: 'app-inventory-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>

    <form [formGroup]="form" (ngSubmit)="submit()" class="dialog-form" mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Item name</mat-label>
        <input matInput formControlName="name" maxlength="120" />
        <mat-error *ngIf="form.controls.name.hasError('required')">Name is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>SKU</mat-label>
        <input matInput formControlName="sku" maxlength="64" />
        <mat-error *ngIf="form.controls.sku.hasError('required')">SKU is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Supplier ID (optional)</mat-label>
        <input matInput formControlName="supplierId" maxlength="120" />
      </mat-form-field>

      <div class="dialog-form__grid">
        <mat-form-field appearance="outline">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" min="0" formControlName="quantity" />
          <mat-error *ngIf="form.controls.quantity.hasError('min')">Must be 0 or greater</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Reorder level</mat-label>
          <input matInput type="number" min="0" formControlName="reorderLevel" />
          <mat-error *ngIf="form.controls.reorderLevel.hasError('min')">Must be 0 or greater</mat-error>
        </mat-form-field>
      </div>

      <mat-form-field appearance="outline">
        <mat-label>Unit price</mat-label>
        <input matInput type="number" min="0" step="0.01" formControlName="unitPrice" />
        <mat-error *ngIf="form.controls.unitPrice.hasError('min')">Must be 0 or greater</mat-error>
      </mat-form-field>
    </form>

    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close type="button">Cancel</button>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid" (click)="submit()">
        Save
      </button>
    </div>
  `,
  styles: [
    `
      .dialog-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: min(480px, 80vw);
        margin-top: 0.5rem;
      }

      .dialog-form__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
      }
    `
  ]
})
export class InventoryFormDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<InventoryFormDialogComponent, InventoryRequestPayload | null>);
  readonly data: InventoryDialogData = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    name: [this.data.item?.name ?? '', [Validators.required, Validators.maxLength(120)]],
    sku: [this.data.item?.sku ?? '', [Validators.required, Validators.maxLength(64)]],
    supplierId: [this.data.item?.supplierId ?? ''],
    quantity: [this.data.item?.quantity ?? 0, [Validators.required, Validators.min(0)]],
    reorderLevel: [this.data.item?.reorderLevel ?? 0, [Validators.required, Validators.min(0)]],
    unitPrice: [this.data.item?.unitPrice ?? 0, [Validators.required, Validators.min(0)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: InventoryRequestPayload = {
      name: value.name.trim(),
      sku: value.sku.trim(),
      supplierId: value.supplierId?.trim() || null,
      quantity: Number(value.quantity),
      reorderLevel: Number(value.reorderLevel),
      unitPrice: Number(value.unitPrice)
    };

    this.dialogRef.close(payload);
  }
}

