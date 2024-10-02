import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarProductoProveedorComponent } from './detallar-producto-proveedor.component';

describe('DetallarProductoProveedorComponent', () => {
  let component: DetallarProductoProveedorComponent;
  let fixture: ComponentFixture<DetallarProductoProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallarProductoProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallarProductoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
