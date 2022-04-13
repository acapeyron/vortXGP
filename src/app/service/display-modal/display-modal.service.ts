import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayModalService {

  constructor() { }

  public displayModal(modal: string, loaded: boolean): void{
    if (!loaded){
      // use of timeout to wait element to render before triggering action
     // could do way better here
     if (!document.getElementById(modal)) {
       setTimeout(() => {
         document.getElementById(modal)?.dispatchEvent(new MouseEvent("click"));
       }, 100); // give everything some time to render
     }
     else {
         document.getElementById(modal)?.dispatchEvent(new MouseEvent("click"));
     }
   }
  }
}
