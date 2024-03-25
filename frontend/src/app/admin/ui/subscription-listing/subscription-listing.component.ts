import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SubscriptionModalModule } from '../subscription-modal/subscription-modal.module';
import { SubscriptionModalComponent } from '../subscription-modal/subscription-modal.component';
import { ISubscription } from 'src/app/shared/types/subscriptionInterface';
import { SubscriptionType } from 'src/app/shared/types';
export interface PeriodicElement {
  name: string;
  description: string;
  features: Array<string>;
  price: number;
  duration: SubscriptionType;
  isActive: boolean;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'subscription-listing',
  templateUrl: './subscription-listing.component.html',
  styleUrls: ['./subscription-listing.component.css'],
})
  export class SubscriptionListingComponent {
    dialogRef!: MatDialogRef<SubscriptionModalComponent>;
    @Output() subcripitionForm: EventEmitter<ISubscription> =
      new EventEmitter<ISubscription>();
    @Input() SubscriptionElements: ISubscription[] = [];
    constructor(public dialog: MatDialog) {}
    displayedColumns: string[] = ['name', 'description', 'features', 'duration', 'price'];
    dataSource = this.SubscriptionElements;
    ngOnInit(): void {
      console.log(this.dataSource)
    }
    openDialog() {
      this.dialogRef = this.dialog.open(SubscriptionModalComponent, {});
      this.dialogRef.componentInstance.subscripitonCreated.subscribe(
        (result: any) => {
          console.log('Data reciecved from modal', result);
          this.subcripitionForm.emit(result);
        }
      );
      this.dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed with result', result);
      });
    }
  }
