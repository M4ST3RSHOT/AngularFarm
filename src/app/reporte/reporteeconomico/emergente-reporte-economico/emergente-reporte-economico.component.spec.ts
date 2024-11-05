import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenteReporteEconomicoComponent } from './emergente-reporte-economico.component';

describe('EmergenteReporteEconomicoComponent', () => {
  let component: EmergenteReporteEconomicoComponent;
  let fixture: ComponentFixture<EmergenteReporteEconomicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergenteReporteEconomicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergenteReporteEconomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
