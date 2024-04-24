import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionExpresionesComponent } from './gestion-expresiones.component';

describe('GestionExpresionesComponent', () => {
  let component: GestionExpresionesComponent;
  let fixture: ComponentFixture<GestionExpresionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionExpresionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionExpresionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
