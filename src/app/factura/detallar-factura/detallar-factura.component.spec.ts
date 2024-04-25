import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarFacturaComponent } from './detallar-factura.component';

describe('DetallarFacturaComponent', () => {
  let component: DetallarFacturaComponent;
  let fixture: ComponentFixture<DetallarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallarFacturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
