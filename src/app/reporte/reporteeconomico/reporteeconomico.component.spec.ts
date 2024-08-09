import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteeconomicoComponent } from './reporteeconomico.component';

describe('ReporteeconomicoComponent', () => {
  let component: ReporteeconomicoComponent;
  let fixture: ComponentFixture<ReporteeconomicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteeconomicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteeconomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
