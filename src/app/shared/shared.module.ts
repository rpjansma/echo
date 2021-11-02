import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CarouselComponent } from './components/carousel/carousel.component';
import {
    ErrorValidationMessageComponent
} from './components/error-validation-message/error-validation-message.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ErrorValidationMessageComponent,
    ModalLoadingComponent,
    GraphicComponent,
    CarouselComponent
  ],
  exports: [
    ErrorValidationMessageComponent,
    ModalLoadingComponent,
    GraphicComponent,
    CarouselComponent
  ],
})
export class SharedModule {}
