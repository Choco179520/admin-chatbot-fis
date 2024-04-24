import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarNivelesComponent } from './agregar-editar-niveles.component';

describe('AgregarEditarNivelesComponent', () => {
  let component: AgregarEditarNivelesComponent;
  let fixture: ComponentFixture<AgregarEditarNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarNivelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
