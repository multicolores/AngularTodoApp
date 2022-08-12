import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from './interface/task';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let httpTestingController: HttpTestingController;
  let service: TaskService;
  
  beforeEach(() => {
  //  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // TestBed.configureTestingModule({
    //   providers: [{provide: HttpClient, useValue: httpClientSpy}]
    // });
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getData should use GET to retrieve data', () => {
    service.getTasks().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:8080/api/tasks');
    expect(testRequest.request.method).toEqual('GET');
  });

  it('#createTask should create a new Task with post request', () => {
    const newTask: Task = {
      id: 5,
      name: "New Task",
      description: "Pull training",
      finished: true,
      importance: "important"
    }
    service.createTask(newTask).subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/api/tasks');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newTask });
    req.event(expectedResponse);
  });

  
  // it('#createTask error 404', () => {
  //   const newTask: Task = {
  //     id: 5,
  //     name: "New Task",
  //     description: "Pull training",
  //     finished: true,
  //     importance: "important"
  //   }
  //   service.createTask(newTask).subscribe();
  //   const req = httpTestingController.expectOne('http://localhost:8080/api/tasks');
  //   const msg = '404 error';
  //   req.flush(msg, { status: 404, statusText: 'Not Found' });
  // });


});
