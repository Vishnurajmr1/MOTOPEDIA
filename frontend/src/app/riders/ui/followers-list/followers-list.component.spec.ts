import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersListComponent } from './followers-list.component';

describe('FollowersListComponent', () => {
  let component: FollowersListComponent;
  let fixture: ComponentFixture<FollowersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowersListComponent]
    });
    fixture = TestBed.createComponent(FollowersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
