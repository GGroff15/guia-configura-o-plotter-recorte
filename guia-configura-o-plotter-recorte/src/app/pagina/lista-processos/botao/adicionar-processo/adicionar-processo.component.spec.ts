import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProcessoComponent } from './adicionar-processo.component';

describe('AdicionarProcessoComponent', () => {
  let component: AdicionarProcessoComponent;
  let fixture: ComponentFixture<AdicionarProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarProcessoComponent]
    });
    fixture = TestBed.createComponent(AdicionarProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
