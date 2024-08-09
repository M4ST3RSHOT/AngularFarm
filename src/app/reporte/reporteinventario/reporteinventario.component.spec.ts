import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteinventarioComponent } from './reporteinventario.component';

describe('ReporteinventarioComponent', () => {
  let component: ReporteinventarioComponent;
  let fixture: ComponentFixture<ReporteinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
