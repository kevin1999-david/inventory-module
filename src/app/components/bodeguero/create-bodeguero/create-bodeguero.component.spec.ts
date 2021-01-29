import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBodegueroComponent } from './create-bodeguero.component';

describe('CreateBodegueroComponent', () => {
  let component: CreateBodegueroComponent;
  let fixture: ComponentFixture<CreateBodegueroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBodegueroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBodegueroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
