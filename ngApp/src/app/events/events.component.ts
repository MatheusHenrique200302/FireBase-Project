import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  animations: [
    trigger('fade', [

      transition('void => *', [
        style({opacity: 0}),
        animate(2000),
      ]),
      transition('* => void',[
        animate(2000,style({opacity: 0}))
      ])
    ]),
    trigger('load',[
      transition('void => *',[
        state('onLoad', style({backgroundImage: "../../assets/images/loading.gif" }))
      ])
      
    ])
  ],
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events = [];
  userCount = {
    value: Number,
  };
  taskCount = {
    value: Number,
  };

  constructor(
    private _authService: AuthService,
    private _eventService: EventService
  ) {}

  ngOnInit() {
    this._eventService.getEvents().subscribe(
      (res) => (this.events = res),
      (err) => console.log(err)
    );
    this._authService.userCounter().subscribe(
      (res) => (this.userCount = res),
      (err) => console.log(err)
    );
    this._authService.taskCounter().subscribe(
      (res) => (this.taskCount = res),
      (err) => console.log(err)
    );
  }
}
