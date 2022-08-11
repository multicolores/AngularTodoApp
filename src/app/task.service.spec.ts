import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

  //todo look if the error is good ?
});
