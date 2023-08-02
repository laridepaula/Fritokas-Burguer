import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafedamanhaComponent } from './cafedamanha.component';

describe('CafedamanhaComponent', () => {
  let component: CafedamanhaComponent;
  let fixture: ComponentFixture<CafedamanhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CafedamanhaComponent]
    });
    fixture = TestBed.createComponent(CafedamanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
