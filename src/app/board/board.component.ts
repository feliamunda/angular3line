import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  qtyCells:number=9;
  cells:number[]=[];
   
  constructor() { }

  ngOnInit(): void {
    this.cells=Array(this.qtyCells).fill(0)       
  }

}
