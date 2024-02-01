import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeaturesComponent } from './post-features.component';

describe('PostFeaturesComponent', () => {
  let component: PostFeaturesComponent;
  let fixture: ComponentFixture<PostFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFeaturesComponent]
    });
    fixture = TestBed.createComponent(PostFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
