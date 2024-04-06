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
    this.subService.createSubscription(subscripiton).subscribe((res) => {
      this.snackbar.showSuccess('Subscripiton created successfully', '✅');
      this.subscriptionData=this.subscriptionData.concat(res.data);
    });
  }
  getSubscriptionData() {
    this.subService.getSubscriptionList().subscribe((result) => {
      this.subscriptionData = result.data;
    });
  }
  ngOnInit() {
    this.getSubscriptionData();
  }
}
