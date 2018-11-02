import { ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MessageService} from './message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private messageService: MessageService,
              private ngZone: NgZone) { }

  handleError(error: any) {
    console.log('ERROR: ', error);

    const msg = (error.error && error.error.message) ? error.error.message : error.message;

    this.ngZone.run(() => {
      this.messageService.showErrorMessage(msg);
    });
  }

}
