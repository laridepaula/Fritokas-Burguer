import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienttableComponent } from './clienttable.component';

describe('ClienttableComponent', () => {
  let component: ClienttableComponent;
  let fixture: ComponentFixture<ClienttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienttableComponent]
    });
    fixture = TestBed.createComponent(ClienttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
