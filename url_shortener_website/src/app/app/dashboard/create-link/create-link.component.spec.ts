import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinkComponent } from './create-link.component';

describe('CreateLinkComponent', () => {
  let component: CreateLinkComponent;
  let fixture: ComponentFixture<CreateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
