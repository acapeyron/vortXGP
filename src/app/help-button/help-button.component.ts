import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TutorialComponent } from '../tutorial/tutorial.component';
@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.css']
})
export class HelpButtonComponent implements OnInit {
  routeList: Array<string|undefined>
  // currently opened page in the modal
  page: number;

  constructor(private modalService: BsModalService, public router: Router, private tutorial: TutorialComponent) {
    this.page = 1;
    this.routeList = [];
    for (let route in router.config){
      if (router.config[route].path != ''){
        this.routeList.push(router.config[route].path?.split('/')[0])
      }
    }
   }

  ngOnInit(): void {
  }

  // function used to map a string to a TemplateRef and return it
  public map(type:string | undefined, choice:TemplateRef<any>, presets:TemplateRef<any>, results:TemplateRef<any>):TemplateRef<any> | undefined {
    switch(type) {
        case 'choice':
          return choice;
        case 'presets':
          return presets;
        case 'results':
          return results;
        default:
          return undefined;
    }
 }
  // function that opens a modal based on the templateString provided
  public openModal(templateString: string | undefined, choice:TemplateRef<any>, presets:TemplateRef<any>, results:TemplateRef<any>) {
    let modalRef = this.map(templateString, choice, presets, results)
    if (modalRef) this.modalService.show(modalRef);
    document.getElementById('btn1')?.focus()
  }

  // function that closes the currently opened modal
  public closeModal(){
    this.modalService.hide();
  }

  // function that changes pages in the modal on button click
  public pageChange(page: number): void{
    this.page = page;
  }

  // function that closes the modal and launches a tutorial interface
  public startTutorial(){
    this.closeModal();
    this.tutorial.showTutorial();
  }
}
