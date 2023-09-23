import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
 
  @Input('parentMessage') message!: any[];
  @Output('childMessage') childMessage=new EventEmitter();



  childUser:string="AM From  Child Component";

  counter: number = 0;


  ngOnInit(): void {
      this.childMessage.emit(this.childUser);
  }




  increment() {
    this.counter = this.counter + 1;
  }

  decrement() {
    this.counter = this.counter - 1;
  }
}
