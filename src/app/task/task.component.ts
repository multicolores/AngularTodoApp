import { Component, OnInit } from '@angular/core';
import { Task } from '../component/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

//   task: Task = {
//     id: 2,
//     name: "Faire muscu",
//     description: "Push training",
//     finished: false,
//     importance: "primordiale"
// }

  tasks: Task[] = [];

  taskDone: boolean = false;
  onTaskStatechange(){
    this.taskDone = !this.taskDone;
  }


  //** Api calls **
  getTasks():void {
    this.taskService.getTasks().subscribe((data)=> {
      console.log(data);
      this.tasks = data;
    })
    // console.log(this.taskService.getTasks());
  }
}
