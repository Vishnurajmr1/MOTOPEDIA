import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, isUserLoggedIn } from '../../../auth/data-access/state';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing-container',
  templateUrl: './pricing-container.component.html',
  styleUrls: ['./pricing-container.component.css'],
})
export class PricingContainerComponent {
  private store = inject(Store<State>);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.store.select(isUserLoggedIn).subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
  payNow(plan: string) {
   if(!this.isLoggedIn){
    this.router.navigateByUrl('/auth/login')
    this.snackbar.showError('Please login');
    return
   }


  }
}
