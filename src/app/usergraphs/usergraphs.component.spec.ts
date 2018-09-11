import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergraphsComponent } from './usergraphs.component';

describe('UsergraphsComponent', () => {
  let component: UsergraphsComponent;
  let fixture: ComponentFixture<UsergraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
