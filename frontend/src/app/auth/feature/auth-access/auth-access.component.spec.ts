import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccessComponent } from './auth-access.component';

describe('AuthAccessComponent', () => {
  let component: AuthAccessComponent;
  let fixture: ComponentFixture<AuthAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAccessComponent]
    });
    fixture = TestBed.createComponent(AuthAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
