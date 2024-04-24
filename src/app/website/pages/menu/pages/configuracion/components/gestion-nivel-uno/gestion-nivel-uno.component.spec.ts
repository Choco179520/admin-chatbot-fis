import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNivelUnoComponent } from './gestion-nivel-uno.component';

describe('GestionNivelUnoComponent', () => {
  let component: GestionNivelUnoComponent;
  let fixture: ComponentFixture<GestionNivelUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionNivelUnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionNivelUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
