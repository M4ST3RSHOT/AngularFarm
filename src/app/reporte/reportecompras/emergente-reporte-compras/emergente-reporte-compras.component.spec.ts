import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteReporteComprasComponent } from './emergente-reporte-compras.component';

describe('EmergenteReporteComprasComponent', () => {
  let component: EmergenteReporteComprasComponent;
  let fixture: ComponentFixture<EmergenteReporteComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergenteReporteComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergenteReporteComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
