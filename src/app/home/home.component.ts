import { Component, OnInit } from '@angular/core';
import { PythonService } from '../service/python/python.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private python: PythonService) { }

  ngOnInit(): void {
    // test on python scripts run
    this.python.runScript().subscribe(data => {
      console.log(data)
    });
  }
}
