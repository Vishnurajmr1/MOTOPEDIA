import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionContainerComponent } from './subscription-container.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class subscriptionContainerRoutingModule {}
