import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( ) { }

  error(title: string, text: string){
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 4000
    })
  }

  success(title: string, text: string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 4000
    })
  }

  info(title: string, text: string){
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 4000
    })
  }

}
