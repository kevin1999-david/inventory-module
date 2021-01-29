import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodeguerosComponent } from './bodegueros.component';

describe('BodeguerosComponent', () => {
  let component: BodeguerosComponent;
  let fixture: ComponentFixture<BodeguerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodeguerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodeguerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
