import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { TaskComponent } from './task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { Task } from '../interface/task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let fakeTask: Task[] = [{
    id: 1,
    name: "Faire muscu",
    description: "Push training",
    finished: true,
    importance: "primordiale"
},
{
  id: 2,
  name: "Faire la cuisine",
  description: "Push training",
  finished: false,
  importance: "primordiale"
}];

let spyGet: jasmine.Spy;

  beforeEach(async () => {
    const testServiceSpy = jasmine.createSpyObj<TaskService>(['getTasks']);
    spyGet = testServiceSpy.getTasks.and.returnValue(of(fakeTask));


    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [{provide: TaskService, useValue: testServiceSpy}],
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
  });

  it('Sould call getTasks one time and then update the view and show the tasks on the dom', () => {
    expect(spyGet).toHaveBeenCalled();
    expect( spyGet.calls.all().length ).toEqual(1);

    const taskDiv = fixture.debugElement.queryAll(By.css('.task'));
    expect(taskDiv.length).toEqual(fakeTask.length);
  });


  // it('finished boolean value from the task sould change', () => {

  // });

});
