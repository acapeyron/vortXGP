import { trigger, transition, style, animate, query, group} from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationService } from './service/navigation/navigation.service';

const fade = [
  query(':self', 
    [
      style({ opacity: 0 })
    ], 
    { optional: true }
  ),

  query(':self',
    [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ], 
    { optional: true }
  )
];

const slideUp = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 ,transform: 'translate3d(0,0%,0)' }), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0,-100%,0)' }), {optional:true}),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,100%,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,0%,0)' })),
    ]), {optional:true})
  ])
]

const slideDown = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0,0%,0)'}), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(0,100%,0)'}), {optional:true}),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,-100%,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,0%,0)' })),
    ]), {optional:true})
  ])
]

const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0,0%,0)'}), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)'}), {optional:true}),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,0%,0)' })),
    ]), {optional:true})
  ])
]

const slideRight = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0,0%,0)'}), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)'}), {optional:true}),

  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0,0%,0)' })),
    ]), {optional:true})
  ])
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimations', [
      transition('home => choice', slideDown),
      transition('choice => home', slideUp),
      transition('choice => presets', slideLeft),
      transition('presets => choice', slideRight),
      transition('presets => results', slideDown),
      transition('results => presets', slideUp)
    ])
  ]
})

export class AppComponent {
  
  constructor(public navigation: NavigationService) {
    this.navigation.startSaveHistory();
  }
  
  prepareRouteTransition(outlet:any) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
