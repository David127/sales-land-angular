import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLeadComponent } from './formulario-lead.component';

describe('FormularioLeadComponent', () => {
  let component: FormularioLeadComponent;
  let fixture: ComponentFixture<FormularioLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
