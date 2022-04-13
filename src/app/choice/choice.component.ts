import { Component, OnInit, TemplateRef } from '@angular/core';
import { DisplayModalService } from '../service/display-modal/display-modal.service';
// import { timeStamp } from 'console';

let loaded = false;

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor(public display: DisplayModalService) {
  }

  ngOnInit(): void{
    this.display.displayModal('choice', loaded);
    loaded = true;
  }
}
