import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { param } from 'jquery';
import { Subscription } from 'rxjs';
import { Preset } from '../model/preset';
import { DisplayModalService } from '../service/display-modal/display-modal.service';

let loaded = false;

const steady = "ASteady";
const unsteady = "BUnsteady";
const light = "CLight";
const medium = "DMedium";
const advanced = "EAdvanced";
const rpm20 = "F20_rpm";
const rpm72 = "G72_rpm";

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})


export class PresetsComponent implements OnInit {
  preset_dic: { [key: string]: [Preset, boolean] };

  filter_list: { [key: string]: boolean };
  // video: string;
  // last_key_pressed: any;
  route: string;
  deployed: string;
  title: string;

  constructor(public display: DisplayModalService) {
    this.preset_dic = this.fillDic();

    this.filter_list = {
      "ASteady": true,
      "BUnsteady": true,
      "CLight": true,
      "DMedium": true,
      "EAdvanced": true,
      "F20_rpm": true,
      "G72_rpm": true,
    }
    // this.video = "../../assets/videos/vortx.mp4";
    this.route = "?";
    // this.last_key_pressed  = "";
    this.deployed = '';
    this.title = "Choose your preset"
  }

  ngOnInit(): void {
    // display help modal on first page load
    this.display.displayModal('presets', loaded);
    loaded = true;
  }

  deploy(key: any, button: any): void {
    if (this.deployed == key) {
      this.deployed = '';
      this.route = '?';
      this.title = "Choose your preset"
    } else {
      this.deployed = key;
      this.route = this.title = this.preset_dic[key][0].name;
      // this.route = key + "_" + this.preset_dic[key][0].parameters;
      // this.formatParameters(key, this.preset_dic[key][0].parameters);
      this.scroll(button);
    }

  }

  scroll(button: any) {
    let list = document.getElementsByClassName('content-list')[0];
    let filtered_list = Array.from(list.childNodes).filter(this.comments);

    for (let i = 0; i < filtered_list.length; i++) {
      if (filtered_list[i] == button) {
        setTimeout(() => {
          list.scroll({ top: 193 * i, behavior: "smooth" })
        }, 100)
      }
    }
  }

  comments(el: any) {
    return el.nodeName != "#comment"
  }

  resetView(): void {
    this.deployed = '';
    document.getElementsByClassName('content-list')[0]?.scroll({ top: 0, behavior: "smooth" })
  }

  filter(preset: any): any {
    let param_array = preset.value[0].parameters;
    let param_number = param_array.length;
    let count = 0;

    for (let i = 0; i < param_number; i++) {
      if (this.filter_list[param_array[i]]) count++
    }
    if (count == param_number) return true;
    return false;
    // return !this.filter_list[preset.value[0].parameters[0]];
  }

  fillDic(): { [key: string]: [Preset, boolean] } {
    let dic: { [key: string]: [Preset, boolean] } = {};

    let p0 = new Preset(this.formatParameters("0",[steady, light, rpm20]), [steady, light, rpm20], "../../assets/videos/presets/0_Steady_Light_20.mp4", "Coucou");
    dic["A0"] = [p0, false];
    let p1 = new Preset(this.formatParameters("1",[steady, medium, rpm20]), [steady, medium, rpm20], "../../assets/videos/presets/1_Steady_Medium_20.mp4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    dic["B1"] = [p1, false];
    let p2 = new Preset(this.formatParameters("2",[steady, advanced, rpm20]), [steady, advanced, rpm20], "../../assets/videos/presets/2_Steady_Advanced_20.mp4", "Ca");
    dic["C2"] = [p2, false];
    let p3 = new Preset(this.formatParameters("3",[unsteady, light, rpm20]), [unsteady, light, rpm20], "../../assets/videos/presets/3_Unsteady_Light_20.mp4", "Va");
    dic["D3"] = [p3, false];
    let p4 = new Preset(this.formatParameters("4",[unsteady, medium, rpm20]), [unsteady, medium, rpm20], "../../assets/videos/presets/4_Unsteady_Medium_20.mp4", "Ou");
    dic["E4"] = [p4, false];
    let p5 = new Preset(this.formatParameters("5",[unsteady, advanced, rpm20]), [unsteady, advanced, rpm20], "../../assets/videos/presets/5_Unsteady_Advanced_20.mp4", "Quoi");
    dic["F5"] = [p5, false];
    let p6 = new Preset(this.formatParameters("6",[steady, light, rpm72]), [steady, light, rpm72], "../../assets/videos/presets/6_Steady_Light_72.mp4", "Un");
    dic["G6"] = [p6, false];
    let p7 = new Preset(this.formatParameters("7",[steady, medium, rpm72]), [steady, medium, rpm72], "../../assets/videos/presets/7_Steady_Medium_72.mp4", "Peu");
    dic["H7"] = [p7, false];
    let p8 = new Preset(this.formatParameters("8",[steady, advanced, rpm72]), [steady, advanced, rpm72], "../../assets/videos/presets/8_Steady_Advanced_72.mp4", "La");
    dic["I8"] = [p8, false];
    let p9 = new Preset(this.formatParameters("9",[unsteady, light, rpm72]), [unsteady, light, rpm72], "../../assets/videos/presets/9_Unsteady_Light_72.mp4", "Oh");
    dic["J9"] = [p9, false];
    let p10 = new Preset(this.formatParameters("10",[unsteady, medium, rpm72]), [unsteady, medium, rpm72], "../../assets/videos/presets/10_Unsteady_Medium_72.mp4", "Eh");
    dic["K10"] = [p10, false];
    let p11 = new Preset(this.formatParameters("11",[unsteady, advanced, rpm72]), [unsteady, advanced, rpm72], "../../assets/videos/presets/11_Unsteady_Advanced_72.mp4", "Ah");
    dic["L11"] = [p11, false];

    return dic;
  }

  formatParameters(preset_id: string, parameters : string[]): string{
    let formatted = preset_id;
    parameters.forEach((param)=>{
      formatted += "_" + param.substring(1);
    })
    return formatted;
  }
}
