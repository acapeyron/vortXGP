import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChoiceComponent } from './choice/choice.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { PresetsComponent } from './presets/presets.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { ResultsComponent } from './results/results.component';
import { TutorialComponent } from './tutorial/tutorial.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChoiceComponent,
    BackButtonComponent,
    PresetsComponent,
    HelpButtonComponent,
    ResultsComponent,
    TutorialComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSliderModule,
    ModalModule.forRoot()
  ],
  providers: [TutorialComponent, PresetsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
