import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContainerComponent } from './display-container.component';

describe('DisplayContainerComponent', () => {
  let component: DisplayContainerComponent;
  let fixture: ComponentFixture<DisplayContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayContainerComponent]
    });
    fixture = TestBed.createComponent(DisplayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
