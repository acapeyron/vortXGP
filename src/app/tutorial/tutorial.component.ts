import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresetsComponent } from '../presets/presets.component';

const undeployed = 'canvas';
const deployed = 'canvas-deployed';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  // varaible that determines if tutorial is deployed or not
  deployed: boolean;
  // variable responsible of the current position and size of the glowing
  // div that focuses the user attention on one element in the page
  focus: string;
  tuto_list: any;

  constructor(private router: Router, private presets: PresetsComponent) {
    this.focus = "1";
    this.deployed = false;
    this.tuto_list = {
      "1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      "2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      "3": "Zebi",
      "4": "The fly",
      "5": "Which flies",
      "6": "Download",
    }
  }

  ngOnInit(): void {
  }

  public showTutorial(){
    // only way I found to efficiently rest the view
    document.getElementById('reset')?.click()
    document.getElementById('show')?.click()
  }

  // deploy tutorial
  public deploy(){
    this.deployed = true;
  }

  // changes focus on different element when user
  //  clicks 'continue' in tutorial
  public moveFocus(current_focus: string){
    if (current_focus == '1' ) this.focus = "2"
    else if (current_focus == '2'){
      this.presets.deployVideo(0);
      this.presets.deployed = '0';
      this.focus = "3";
    }
    else if (current_focus == '3') this.focus = "4"
    else if (current_focus == '4') this.focus = "5"
    else if (current_focus == '5') this.focus = "6"
  }

  // exits tutorial
  public exit(){
    this.resetView();
    this.deployed = false;
  }

  // resets view to inital state if the user launches
  // tutorial after interacting with stuff on the page
  // 
  public resetView(){
    this.focus = "1";
    if (this.router.url == '/presets'){
      this.presets.resetView();
    } else {

    }
  }
}
