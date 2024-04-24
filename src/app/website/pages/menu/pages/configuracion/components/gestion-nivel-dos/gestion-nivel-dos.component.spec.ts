import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNivelDosComponent } from './gestion-nivel-dos.component';

describe('GestionNivelDosComponent', () => {
  let component: GestionNivelDosComponent;
  let fixture: ComponentFixture<GestionNivelDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionNivelDosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionNivelDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
