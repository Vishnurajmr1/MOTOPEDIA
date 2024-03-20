import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingContainerComponent } from './pricing-container.component';

describe('PricingContainerComponent', () => {
  let component: PricingContainerComponent;
  let fixture: ComponentFixture<PricingContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingContainerComponent]
    });
    fixture = TestBed.createComponent(PricingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
