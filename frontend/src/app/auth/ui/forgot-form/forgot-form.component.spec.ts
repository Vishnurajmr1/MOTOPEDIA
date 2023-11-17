import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotFormComponent } from './forgot-form.component';

describe('ForgotFormComponent', () => {
  let component: ForgotFormComponent;
  let fixture: ComponentFixture<ForgotFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotFormComponent]
    });
    fixture = TestBed.createComponent(ForgotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
