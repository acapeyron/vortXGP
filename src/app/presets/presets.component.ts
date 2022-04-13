import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DisplayModalService } from '../service/display-modal/display-modal.service';

let loaded = false;

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {
  presetDic : any;
  video: string;
  last_key_pressed: any;
  route: string;
  deployed: string;
  swipe: boolean;

  constructor(public display: DisplayModalService, private cd: ChangeDetectorRef, private ar: ApplicationRef, public nz: NgZone) {
    this.presetDic = {
      "0": ["../../assets/videos/vortx.mp4", false], 
      "1": ["../../assets/videos/surf.mp4", false], 
      "2": ["../../assets/videos/presets/isosurface.mp4", false], 
      "3": ["../../assets/videos/presets/isosurface.mp4", false], 
      "4": ["../../assets/videos/presets/isosurface.mp4", false], 
      "5": ["../../assets/videos/presets/isosurface.mp4", false], 
      "6": ["../../assets/videos/presets/isosurface.mp4", false], 
      "7": ["../../assets/videos/presets/isosurface.mp4", false], 
      "8": ["../../assets/videos/presets/isosurface.mp4", false], 
      "9": ["../../assets/videos/presets/isosurface.mp4", false], 
    };

    this.video = "../../assets/videos/vortx.mp4";
    this.route  = this.last_key_pressed = "";

    this.deployed = '';
    this.swipe = false;
  }

  ngOnInit(): void{
    // display help modal on first page load
    this.display.displayModal('presets', loaded);
    loaded = true;
  }
  
  deployVideo(key: any): void{
    this.video = this.presetDic[key][0];
    this.route = key;
    if (key == this.last_key_pressed){
      if (!this.deployed){
        this.deployed = key;
      } else {
        this.deployed = '';
      }
    } else {
      this.deployed = key;
      this.last_key_pressed = key;
    }
    
    setTimeout(() => {
      document.getElementById('list')?.scroll({top: 72*key, behavior: "smooth"})
    }, 84*key)
  }

  resetView(){
    this.deployed = '';
    document.getElementById('list')?.scroll(0,0)
  }
}
