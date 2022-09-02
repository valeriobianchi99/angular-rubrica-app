import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { Subscription } from 'rxjs';
import { Log } from '../log.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  subscription: Subscription;
  logs: Log[];

  constructor(private logserv: LogsService) {
    console.clear();
    this.subscription = this.logserv.getLogs().subscribe(
      res => this.logs = res
    );
  }

  ngOnInit() {
  }

}
