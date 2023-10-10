import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoProcessoComponent } from './filtro-tipo-processo.component';

describe('FiltroTipoProcessoComponent', () => {
  let component: FiltroTipoProcessoComponent;
  let fixture: ComponentFixture<FiltroTipoProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroTipoProcessoComponent]
    });
    fixture = TestBed.createComponent(FiltroTipoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
