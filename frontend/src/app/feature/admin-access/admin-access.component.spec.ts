import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccessComponent } from './admin-access.component';

describe('AdminAccessComponent', () => {
  let component: AdminAccessComponent;
  let fixture: ComponentFixture<AdminAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccessComponent]
    });
    fixture = TestBed.createComponent(AdminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
