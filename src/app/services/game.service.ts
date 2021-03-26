import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  message:String ='';
  qtyCells:number = 9;

  constructor() { }
}
