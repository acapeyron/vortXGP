import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
 
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) { }

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.history.push(event.urlAfterRedirects);
      }
    })
  }

  public getHistory(): string[] {
    return this.history;
  }

  public goBack(): void {
    if (this.history.length > 0){
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
    this.history.pop();
  }

  public getPreviousUrl(): string {
    if (this.history.length > 0){
      return this.history[this.history.length - 2];
    }
    return '';
  }
}
