import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProcessoComponent } from './item-processo.component';

describe('ItemProcessoComponent', () => {
  let component: ItemProcessoComponent;
  let fixture: ComponentFixture<ItemProcessoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemProcessoComponent]
    });
    fixture = TestBed.createComponent(ItemProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
