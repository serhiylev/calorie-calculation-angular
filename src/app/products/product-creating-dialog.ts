import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-product-creating-dialog',
  templateUrl: 'product-creating-dialog.html',
})
export class ProductCreatingDialogComponent {
  // private productImage: File;
  url = '';

  constructor(
    public dialogRef: MatDialogRef<ProductCreatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectFile(event) {
    this.data.productImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        // @ts-ignore
        this.url = reader.result;
      }
    }
  }
}

export interface DialogData {
  productDescription: string;
  productName: string;
  productImage: File;
  productKcal: number;
  productCarbohydrates: number;
  productProteins: number;
  productFats: number;
  type: string;
}
