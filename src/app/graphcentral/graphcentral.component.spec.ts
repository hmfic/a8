import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphcentralComponent } from './graphcentral.component';

describe('GraphcentralComponent', () => {
  let component: GraphcentralComponent;
  let fixture: ComponentFixture<GraphcentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphcentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphcentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
