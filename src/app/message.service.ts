import { Injectable } from '@angular/core';
import {ToastaService, ToastaConfig} from 'ngx-toasta';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private toastaService: ToastaService, private toastaConfig: ToastaConfig) {
    this.toastaConfig.theme = 'material';
  }

  showSuccessMessage(message: string) {
    this.toastaService.success(message);
  }

  showErrorMessage(message: string) {
    this.toastaService.error(message);
  }

  showWarningMessage(message: string) {
    this.toastaService.warning(message);
  }

  showInfoMessage(message: string) {
    this.toastaService.info(message);
  }

}
