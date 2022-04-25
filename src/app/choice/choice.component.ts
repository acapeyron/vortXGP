import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DisplayModalService } from '../service/display-modal/display-modal.service';
// import { timeStamp } from 'console';

let loaded = false;

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor(public display: DisplayModalService, private modalService: BsModalService) {
  }

  ngOnInit(): void{
    this.display.displayModal('choice', loaded);
    loaded = true;
  }
  underDevelopment(): void {
    this.display.displayModal('presets', loaded);
    loaded = true;
  }

  // function that opens a modal based on the templateString provided
  public openModal(modalRef: TemplateRef<any>) {
    if (modalRef) this.modalService.show(modalRef);
    // alert('Unfortunately this part of the app is unavailable at the moment. We are working on it, sorry for the inconvenience.')
  }
}
