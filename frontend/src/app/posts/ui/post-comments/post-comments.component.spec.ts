import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsComponent } from './post-comments.component';

describe('PostCommentsComponent', () => {
  let component: PostCommentsComponent;
  let fixture: ComponentFixture<PostCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCommentsComponent]
    });
    fixture = TestBed.createComponent(PostCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
