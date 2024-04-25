import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarCompraComponent } from './detallar-compra.component';

describe('DetallarCompraComponent', () => {
  let component: DetallarCompraComponent;
  let fixture: ComponentFixture<DetallarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallarCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
