import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDocumentosComponent } from './agregar-editar-documentos.component';

describe('AgregarEditarDocumentosComponent', () => {
  let component: AgregarEditarDocumentosComponent;
  let fixture: ComponentFixture<AgregarEditarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
