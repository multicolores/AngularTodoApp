import { Component, OnInit } from '@angular/core';

import { Task } from '../interface/task';
import { TaskService } from '../task.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogNewtaskComponent } from '../component/dialog-newtask/dialog-newtask.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTasks();
    this.tasksLeftToDo();
  }



  tasks: Task[] = [];

//   tasks: Task[] = [{
//     id: 2,
//     name: "Faire muscu",
//     description: "Push training",
//     finished: false,
//     importance: "primordiale"
// },
// {
//   id: 2,
//   name: "Faire muscu",
//   description: "Push training",
//   finished: false,
//   importance: "primordiale"
// }];

  taskDone: boolean = false;
  onTaskStatechange(){
    this.taskDone = !this.taskDone;
  }


  //** Api calls **
  getTasks():void {
    this.taskService.getTasks().subscribe((data)=> {
      console.log(data);
      this.tasks = data;
      this.tasksLeftToDo();
    })
    // console.log(this.taskService.getTasks());
  }

  createTask(newtask: Task):void {
    this.taskService.createTask(newtask).subscribe((data)=> {
      console.log(data);
      this.getTasks();
      // this.tasks.push(newtask);
    })
  }

  //** click events */

  createNewTask():void {
    const dialogref = this.dialog.open(DialogNewtaskComponent);
    dialogref.afterClosed().subscribe((result)=> {
      console.log(result);
      this.createTask(result);
    })
  }

  removeTask(taskToRemove: Task): void{
    this.taskService.deleteTask(taskToRemove.id).subscribe((data)=> {
      console.log(data);
      this.getTasks();
      // this.tasks.splice(this.tasks.indexOf(taskToRemove),1);
    })
  }

  taskStatechange(task: Task): void{
    task.finished = !task.finished;
    this.taskService.putTask(task.id, task).subscribe((data)=> {
      console.log(data);
      this.getTasks();
    })
  }


  //** Compteur du nombre de tache qui reste à faire
  taskLeftToDo: boolean[] = [];
  // taskLeftToDo: number = 0;

  tasksLeftToDo(){
  this.taskLeftToDo = [];
    this.tasks.forEach((task, index) => {
      if(!task.finished){
        // this.taskLeftToDo++;
        this.taskLeftToDo.push(false);
      }else{
        this.taskLeftToDo.push(true);

      }
    })
    // this.taskDoneNumber = this.tasks.length - this.taskLeftToDo;
  }
}
