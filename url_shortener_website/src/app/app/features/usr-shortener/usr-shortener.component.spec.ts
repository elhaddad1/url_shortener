import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrShortenerComponent } from './usr-shortener.component';

describe('UsrShortenerComponent', () => {
  let component: UsrShortenerComponent;
  let fixture: ComponentFixture<UsrShortenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsrShortenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsrShortenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
