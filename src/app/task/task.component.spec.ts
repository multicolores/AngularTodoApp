import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { of } from 'rxjs';
import { TaskComponent } from './task.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    const tastServiceSpy = jasmine.createSpyObj<TaskService>(['getTasks']);
    tastServiceSpy.getTasks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [{provide: TaskService, useValue: tastServiceSpy}],
      imports: [MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould get some tasks', () => {
    expect(component.tasks.length).toBeTruthy();
  })
});
