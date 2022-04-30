import { BehaviorSubject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../../core/services/event-service/event.service';
import { UserService } from '../../core/services/user-service/user.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  events = [];
  refresh: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.process()
  }

  process(): void {
    this.fetchEventLogList();
    console.log(this.events)
  }

  fetchEventLogList(): void {
    const userId = this.userService.getUserId();
    this.events = [];
    this.eventService.getUserEventLogs(userId).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          _id: res[i]._id,
          event: res[i].event,
          consultationDate: new Date(res[i].consultationDate),
        });
      }
      this.refresh.next(this.events);
    });
  }

  deleteEventLog(id, content): void {
    this.eventService.deleteEventLog(id).subscribe(
      () => {
        this.fetchEventLogList();
      },
      () => {}
    );
    this.modal.open(content);
  }
}
