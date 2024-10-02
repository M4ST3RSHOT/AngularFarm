import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarinventarioComponent } from './importarinventario.component';

describe('ImportarinventarioComponent', () => {
  let component: ImportarinventarioComponent;
  let fixture: ComponentFixture<ImportarinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportarinventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportarinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
