import { ɵBrowserDomAdapter } from '@angular/platform-browser';
import { Board } from './board';

export class Game{
    id:string;
    state:string;
    creationDate:string;
    board:Board;
}