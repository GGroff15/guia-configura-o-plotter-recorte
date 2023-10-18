import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProcessoComponent } from './editar-processo.component';

describe('EditarProcessoComponent', () => {
  let component: EditarProcessoComponent;
  let fixture: ComponentFixture<EditarProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProcessoComponent]
    });
    fixture = TestBed.createComponent(EditarProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
