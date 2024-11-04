import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteReporteInventarioComponent } from './emergente-reporte-inventario.component';

describe('EmergenteReporteInventarioComponent', () => {
  let component: EmergenteReporteInventarioComponent;
  let fixture: ComponentFixture<EmergenteReporteInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergenteReporteInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergenteReporteInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
