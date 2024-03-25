import { Component, inject } from '@angular/core';
import { SubscriptionService } from '../../../../app/shared/data-access/global/subscription.service';
import { ISubscription } from '../../../../app/shared/types/subscriptionInterface';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';

@Component({
  selector: 'app-subscription-container',
  templateUrl: './subscription-container.component.html',
  styleUrls: ['./subscription-container.component.css'],
})
export class SubscriptionContainerComponent {
  private subService = inject(SubscriptionService);
  private snackbar = inject(SnackbarService);
  subscriptionData: ISubscription[] = [];
  handleSubscriptionForm(subscripiton: ISubscription) {
    console.log(subscripiton);
    this.subService.createSubscription(subscripiton).subscribe((res) => {
      console.log(res);
      this.snackbar.showSuccess('Subscripiton created successfully', '✅');
    });
  }
  getSubscriptionData() {
    this.subService.getSubscriptionList().subscribe((result) => {
      console.log(result);
      this.subscriptionData = result.data;
      console.log(this.subscriptionData);
    });
  }
  ngOnInit() {
    this.getSubscriptionData();
  }
}
