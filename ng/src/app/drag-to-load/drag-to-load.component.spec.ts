import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragToLoadComponent } from './drag-to-load.component';

describe('DragToLoadComponent', () => {
  let component: DragToLoadComponent;
  let fixture: ComponentFixture<DragToLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragToLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragToLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
