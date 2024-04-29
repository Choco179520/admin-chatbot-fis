import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaNivelesComponent } from './tarjeta-niveles.component';

describe('TarjetaNivelesComponent', () => {
  let component: TarjetaNivelesComponent;
  let fixture: ComponentFixture<TarjetaNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaNivelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
