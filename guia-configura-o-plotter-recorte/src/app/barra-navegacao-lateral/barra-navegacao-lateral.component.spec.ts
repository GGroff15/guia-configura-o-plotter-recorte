import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegacaoLateralComponent } from './barra-navegacao-lateral.component';

describe('BarraNavegacaoLateralComponent', () => {
  let component: BarraNavegacaoLateralComponent;
  let fixture: ComponentFixture<BarraNavegacaoLateralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraNavegacaoLateralComponent]
    });
    fixture = TestBed.createComponent(BarraNavegacaoLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
