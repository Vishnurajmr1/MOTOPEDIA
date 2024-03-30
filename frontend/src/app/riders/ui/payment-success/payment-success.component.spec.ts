import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessComponent } from './payment-success.component';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSuccessComponent]
    });
    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
