import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaUltimoNivelComponent } from './tarjeta-ultimo-nivel.component';

describe('TarjetaUltimoNivelComponent', () => {
  let component: TarjetaUltimoNivelComponent;
  let fixture: ComponentFixture<TarjetaUltimoNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaUltimoNivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaUltimoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
