import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Image } from '../model/image';
import { ImageService } from '../service/image/image.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  simulation!: string;
  folder!: string;

  constructor(private http: HttpClient, private is: ImageService) { }

  ngOnInit(): void {
    // test on python scripts run
    // this.python.runScript().subscribe(data => {
    //   console.log(data)
    // });
    this.is.get(1).subscribe((data) => {
      console.log(data)
    })
  }

  public upload(): void {
    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    const files = input?.files;
    console.log(this.simulation, this.folder)
    for (let i = 0; i < files!.length; i++) {
      setTimeout(() => {
        let file = files![i];
        var reader = new FileReader();
        reader.onload = () => {
          let base64String = reader.result!.toString().replace("data:", "").replace(/^.+,/, "");
          // console.log(base64String);
          let img = new Image();
          img.simulation = this.simulation;
          img.folder = this.folder;
          img.title = file.name.split('.')[0] + file.name.split('.')[1];
          img.image = base64String;
          this.is.add(img).subscribe((data) => {
            console.log(data)
            console.log(i);
          })
        }
        reader.readAsDataURL(file);
      }, 100)

    }
  }
}

function convertDataURIToBinary(dataURI: any): any {
  var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

