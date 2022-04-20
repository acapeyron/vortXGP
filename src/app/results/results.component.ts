import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DisplayModalService } from '../service/display-modal/display-modal.service';

let loaded = false;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  result_id: string;

  turbine_width: number;
  turbine_offset: number;
  turbine_steps: number;

  slide1_value: number;
  slide2_value: number;

  options1: Options;
  options2: Options;

  constructor(private route: ActivatedRoute, public display: DisplayModalService) {
    this.result_id = "";
    this.route.params.subscribe((params: Params) => this.result_id = params["id"]);

    this.slide1_value = 0;
    this.slide2_value = 0;

    this.options1 = {
      floor: 0,
      ceil: 0.5,
      step: 0.05
    };
    this.options2 = {
      floor: 0,
      ceil: 2,
      step: 1
    };

    // width (in vw) of the relevant part of the turbine img
    this.turbine_width = 6.2;
    // starting position (in vw) of the relevant part of the turbine img
    this.turbine_offset = 12.5;
    this.turbine_steps = this.initSlide();
  }
  
  ngOnInit(): void {
    // display help modal on first page load
    this.display.displayModal('results', loaded);
    loaded = true;
  }

  initSlide(){
    // check number of imgs for the 'z' slide 
    // and divide the area to cover in the turbine img
    // by this number to get size (in vw) of the steps between each trapeze
    return this.turbine_width / this.options2.ceil!;
  }

  sliderEvent() {
    let position = this.turbine_offset + this.turbine_steps * this.slide2_value;
    let trapeze =  document.getElementById('trapeze');
    if (position != this.turbine_offset){
      trapeze?.setAttribute('style', 'left:' + position + 'vw; border-left: 2px solid rgb(255,0,0,0.2); border-bottom: 2px solid rgb(255,0,0,0.2);');
    } else {
      trapeze?.setAttribute('style', 'left:' + position + 'vw');
    }
  }

}
