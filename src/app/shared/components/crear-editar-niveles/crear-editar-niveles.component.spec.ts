import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarNivelesComponent } from './crear-editar-niveles.component';

describe('CrearEditarNivelesComponent', () => {
  let component: CrearEditarNivelesComponent;
  let fixture: ComponentFixture<CrearEditarNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarNivelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
