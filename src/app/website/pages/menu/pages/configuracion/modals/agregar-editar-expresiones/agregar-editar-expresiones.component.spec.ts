import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarExpresionesComponent } from './agregar-editar-expresiones.component';

describe('AgregarEditarExpresionesComponent', () => {
  let component: AgregarEditarExpresionesComponent;
  let fixture: ComponentFixture<AgregarEditarExpresionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarExpresionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarExpresionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
