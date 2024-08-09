import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteventasusuarioComponent } from './reporteventasusuario.component';

describe('ReporteventasusuarioComponent', () => {
  let component: ReporteventasusuarioComponent;
  let fixture: ComponentFixture<ReporteventasusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteventasusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteventasusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
