import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { Event } from 'src/app/shared/interfaces/event-interface';

import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../../core/services/event-service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnChanges {
  eventForm: FormGroup;
  loading: boolean = false;
  events: Event[] = [];
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  id = this.userService.getUserId();
  event$ = this.eventService.getUserEvents(this.id);


  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.eventForm.updateValueAndValidity.call(
      switchMap(() => this.eventService.getAllEvents())
    );
  }

  fetchEventList(): void {
    const id = this.userService.getUserId();
    this.events = [];
    this.eventService.getUserEvents(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          _id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end)
        });
      }
      this.refresh.next(this.events);
    });
  }

  newEvent() {
    const user = this.userService.getUserId();
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.createEvent(user, title, start, end);
    this.eventForm.reset();
  }

  editEvent() {
    const id: any = '';
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.updateEvent(id, title, start, end);

    this.eventForm.reset();
  }

  createEvent(user, title, start, end) {
    this.loading = true;
    this.eventService.createEvent(user, title, start, end).subscribe(
      () => {
        this.loading = false;
        this.fetchEventList();
        this.modal.dismissAll();
      },
      () => {}
    );
    return;
  }

  updateEvent(id, title, start, end) {
    this.loading = true;
    this.eventService.updateEvent(id, title, start, end).subscribe(
      () => {
        this.loading = false;
        this.fetchEventList();

        this.modal.dismissAll();
      },
      () => {}
    );
    return;
  }

  deleteEvent(eventToDelete: Event, id: any = ''): void {
    this.loading = true;
    this.events = this.events.filter((event) => event !== eventToDelete);
    id = eventToDelete._id;
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.fetchEventList();
        this.loading = false;
      },
      () => {}
    );
  }

  isRequiredAndTouched(control: string) {
    return (
      !this.eventForm.get(control).valid &&
      this.eventForm.get(control).touched
    );
  }

  openModal(modal) {
    this.modal.open(modal);
  }
}
