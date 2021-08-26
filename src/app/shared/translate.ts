import { animate, style, transition, trigger } from "@angular/animations";

export const translateAnimation = trigger('translate', [
    transition(':enter', [
        style({opacity:0, transform:'translateX(-200px)'}),
        animate('400ms', style({opacity:1, transform:'translateX(0px)'}))
    ]),
    transition(':leave', [
        animate('100ms', style({opacity:0, transform:'translateX(200px)'}))
    ])
])