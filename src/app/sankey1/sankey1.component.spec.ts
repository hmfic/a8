import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sankey1Component } from './sankey1.component';


describe('Sankey1Component', () => {
  let component: Sankey1Component;
  let fixture: ComponentFixture<Sankey1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sankey1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sankey1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
