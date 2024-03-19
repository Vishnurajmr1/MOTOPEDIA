import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostContainerComponent } from './report-post-container.component';

describe('ReportPostContainerComponent', () => {
  let component: ReportPostContainerComponent;
  let fixture: ComponentFixture<ReportPostContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportPostContainerComponent]
    });
    fixture = TestBed.createComponent(ReportPostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
