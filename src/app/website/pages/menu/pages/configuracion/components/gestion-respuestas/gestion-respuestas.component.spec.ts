import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRespuestasComponent } from './gestion-respuestas.component';

describe('GestionRespuestasComponent', () => {
  let component: GestionRespuestasComponent;
  let fixture: ComponentFixture<GestionRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRespuestasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
