import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingContainerComponent } from './pricing-container.component';

const routes: Routes = [
  {
    path: '',
    component: PricingContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingContainerRoutingModule {}
