import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProcessoFloatingComponent } from './adicionar-processo-floating.component';

describe('AdicionarProcessoFloatingComponent', () => {
  let component: AdicionarProcessoFloatingComponent;
  let fixture: ComponentFixture<AdicionarProcessoFloatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarProcessoFloatingComponent]
    });
    fixture = TestBed.createComponent(AdicionarProcessoFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
