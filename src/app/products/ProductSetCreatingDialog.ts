import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-product-set-creating-dialog',
  templateUrl: 'product-set-creating-dialog.html',
})
export class ProductSetCreatingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductSetCreatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  name: string;
  description: string;
}
