export interface Event {
  user: any;
  _id: string;
  title: string;
  start: Date;
  end?: Date;
}
export interface Events extends Array<Event> {}

export interface EventsAPI {
  payload: Event;
}
