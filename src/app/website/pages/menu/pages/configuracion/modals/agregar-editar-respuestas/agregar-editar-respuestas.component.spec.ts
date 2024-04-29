import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarRespuestasComponent } from './agregar-editar-respuestas.component';

describe('AgregarEditarRespuestasComponent', () => {
  let component: AgregarEditarRespuestasComponent;
  let fixture: ComponentFixture<AgregarEditarRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarRespuestasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
