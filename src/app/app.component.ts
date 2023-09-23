import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  message: string = "";
  title = 'angular-concepts';

  firstName: string = "Kumar";
  // message:string="Am From Parent Component";

  usersList: any[] = [
    {
      id: 1,
      name: "sai"
    },
    {
      id: 2,
      name: "raj"
    }
  ];



  // @ViewChild('heading') heading!:ElementRef;
  @ViewChildren('heading') heading!: QueryList<any>;

  @ViewChild(UsersComponent) userComponent: UsersComponent | any;



  constructor() {

  }



  ngAfterViewInit(): void {
    //  this.heading.first.nativeElement.style.color="red";
    //  this.heading.last.nativeElement.style.color="red";
    this.heading.forEach((element: any) => {
      console.log(element);
      element.nativeElement.style.color = "red";
    })

    console.log(this.heading);
  }

  plus() {
    this.userComponent.increment();
  }

  minus() {
    this.userComponent.decrement();
  }


  messageFromChild(event: any) {
    this.message = event;
  }
}
