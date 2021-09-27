import { Component, Input } from '@angular/core';

@Component ({
  selector: 'error-message',
  templateUrl: './error-validation-message.component.html',
  styleUrls: ['./error-validation-message.component.scss']
})

export class ErrorValidationMessageComponent {
 @Input() text = '';
}
