import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DisplayModalService } from '../service/display-modal/display-modal.service';
import { ImageService } from '../service/image/image.service';

let loaded = false;

const iso = "Visualisation_iso";
const vectors = ["Visualisation_vector","Visualisation_vector2","Visualisation_vector3"]

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  result_id: string;

  display_trapeze: boolean;
  loading_iso: boolean;
  loading_vortex: boolean;
  turbine_width: number;
  turbine_offset: number;
  turbine_steps: number;

  slide1_value: number;
  slide2_value: number;

  options1 = {
    floor: 0,
    ceil: 0,
    step: 0
  };

  options2 = {
    floor: 0,
    ceil: 2,
    step: 1
  };

  iso_array: any;
  vectors_array: any = [];

  step: any;

  constructor(private route: ActivatedRoute, public display: DisplayModalService, private is: ImageService) {
    this.result_id = "";
    this.route.params.subscribe((params: Params) => this.result_id = params["id"]);

    this.display_trapeze = false;
    this.loading_iso = true;
    this.loading_vortex = true;

    this.slide1_value = 0;
    this.slide2_value = 0;
    this.step = 0;
    
    this.initOptions(1).then((result: any) => {
      this.options1 = result;
      this.loading_iso = false;
    })
    this.initOptions(2).then((result: any) => {
      this.options2 = result;
    })

    // width (in vw) of the relevant part of the turbine img
    this.turbine_width = 1.7;
    // starting position (in vw) of the relevant part of the turbine img
    this.turbine_offset = 20.5;
    this.turbine_steps = this.initSlide();
    // this.vectors_array = [this.vector1_array,this.vector2_array,this.vector3_array]
    this.vectors_array = [[],[],[]]

  }

  ngOnInit(): void {
    // display help modal on first page load
    this.display.displayModal('results', loaded);
    loaded = true;
  }

  initSlide() {
    // check number of imgs for the 'z' slide 
    // and divide the area to cover in the turbine img
    // by this number to get size (in vw) of the steps between each trapeze
    // return this.turbine_width / this.options2.ceil!;
    return this.turbine_width;
  }

  initOptions(id: number) {
    return new Promise((resolve, reject) => {
      let simulation = this.result_id;
      let options = {
        floor: 0,
        ceil: 0,
        step: 0
      };

      if (id == 1) {
        // read iso folder for current simulation, put everything in array
        this.is.getBySimulationAndFolder(simulation, iso).subscribe((data: any) => {
          this.loading_iso = true;
          this.iso_array = data;
          let ceil = (((this.iso_array.length - 1) * 0.02314) + 1) * 0.1
          options.ceil = Math.round(ceil*100) / 100;
          options.step = options.ceil / this.iso_array.length;
          // trier array ici
          document.getElementById('iso')?.setAttribute('src', "data:image/png;base64," + this.iso_array[0].image)
          this.display_trapeze = true;
          resolve(options);
        })
      } else {
        // for each vector folder, read files and put everything in array
        for (let i=0; i<vectors.length; i++){
          this.is.getBySimulationAndFolder(simulation, vectors[i]).subscribe((data: any) => {
            this.vectors_array[i] = data;
            // console.log(this.vectors_array[i], i)
            // let ceil = (((this.vectors_array[i].length - 1) * 0.02314) + 1) * 0.1
            // options.ceil = Math.round(ceil*100) / 100;
            // options.step = options.ceil / this.vectors_array[i].length;
            // // trier array ici
            // console.log(options)
            // resolve(options);
            if (this.vectors_array[0][0]){
              document.getElementById('vortex')?.setAttribute('src', "data:image/png;base64," + this.vectors_array[0][0].image)
              this.loading_vortex = false;
            }
          })
        }
      }
    })

  }

  trapezeSlide() {
    let position = this.turbine_offset + this.turbine_steps * this.slide2_value;
    let trapeze = document.getElementById('trapeze');
    if (position != this.turbine_offset) {
      trapeze?.setAttribute('style', 'left:' + position + 'vw; border-left: 2px solid rgb(255,0,0,0.2); border-bottom: 2px solid rgb(255,0,0,0.2);');
    } else {
      trapeze?.setAttribute('style', 'left:' + position + 'vw');
    }
  }

  switchImageIso(slide1_value: any, slide2_value: any) {
    // let step = Math.round(slide_value/0.0026249999999999997);
    this.step = Math.round(slide1_value/this.options1.step);
    if (this.step < 320){
      document.getElementById('iso')?.setAttribute('src', "data:image/png;base64," + this.iso_array[this.step].image)
      document.getElementById('vortex')?.setAttribute('src', "data:image/png;base64," + this.vectors_array[slide2_value][this.step].image)
    }
  }

  switchImageVortex(slide2_value: any) {
    let vortex_array = this.vectors_array[slide2_value]
    console.log(this.step, vortex_array)
    document.getElementById('vortex')?.setAttribute('src', "data:image/png;base64," + vortex_array[this.step].image)
  }
}
