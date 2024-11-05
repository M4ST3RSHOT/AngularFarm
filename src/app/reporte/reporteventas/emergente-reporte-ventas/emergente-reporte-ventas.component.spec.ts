import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteReporteVentasComponent } from './emergente-reporte-ventas.component';

describe('EmergenteReporteVentasComponent', () => {
  let component: EmergenteReporteVentasComponent;
  let fixture: ComponentFixture<EmergenteReporteVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergenteReporteVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergenteReporteVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
