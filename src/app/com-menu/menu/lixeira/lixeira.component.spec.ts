import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LixeiraComponent } from './lixeira.component';

describe('LixeiraComponent', () => {
  let component: LixeiraComponent;
  let fixture: ComponentFixture<LixeiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LixeiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LixeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
