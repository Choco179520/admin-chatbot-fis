import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNivelTresComponent } from './gestion-nivel-tres.component';

describe('GestionNivelTresComponent', () => {
  let component: GestionNivelTresComponent;
  let fixture: ComponentFixture<GestionNivelTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionNivelTresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionNivelTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
