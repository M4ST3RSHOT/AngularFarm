import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportecomprasComponent } from './reportecompras.component';

describe('ReportecomprasComponent', () => {
  let component: ReportecomprasComponent;
  let fixture: ComponentFixture<ReportecomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportecomprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportecomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
