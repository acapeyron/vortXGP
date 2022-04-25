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
      "1": "This part displays the list of different presets, each of them processed with different parameters.",
      "2": "Each preset has a specific name based on its parameters and can be clicked to be deployed.",
      "3": "Once deployed, the preset is split in two parts: a video and some text.",
      "4": "The video is a timelapse of the 0.84s simulation",
      "5": "The text is a detailed description of the simulation and its parameters.",
      "6": "Once a preset is deployed, this button will light up and clicking on it gets you to the following results page.",
      "7": "Finally, you are provided with a list of filters to target the simulation you want based on its steadiness, its mesh complexity or even the number of rotations per minute the blade performs."
    }
  }

  ngOnInit(): void {
  }

  public showTutorial(){
    // only way I found to efficiently reset the view
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
      // this.presets.deployVideo(0);
      this.presets.deployed = 'A0';
      this.focus = "3";
    }
    else if (current_focus == '3') this.focus = "4"
    else if (current_focus == '4') this.focus = "5"
    else if (current_focus == '5') {
      this.focus = "6";
      this.presets.deployed = '';
    }
    else if (current_focus == '6') this.focus = "7"
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
