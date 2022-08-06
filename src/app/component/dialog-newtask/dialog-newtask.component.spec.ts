import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewtaskComponent } from './dialog-newtask.component';

describe('DialogNewtaskComponent', () => {
  let component: DialogNewtaskComponent;
  let fixture: ComponentFixture<DialogNewtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
