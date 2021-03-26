import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service'

import { ModalComponent } from 'src/app/modal/modal.component'

interface Combination{
  first:number;
  second:number;
  third:number;
}
interface Player{
  num:number;
  score:number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  
  qtyCells:number = 0;
  cells:number[] = [];
  players: Player[] = []
  possibleCombinations:Combination[]=[]
  activePlayer:number = 0;
  finished:boolean=false;
  
  constructor(
    public dialog:MatDialog,
    public game:GameService
  ) { }

  ngOnInit(): void {
    this.qtyCells = this.game.qtyCells
    this.players = [
      {num:1, score:0},
      {num:2, score:0}
    ]
    this.resetBoard()
    this.possibleCombinations=[
      // Vertical combo
      {first:0,second:3,third:6},
      {first:1,second:4,third:7},
      {first:2,second:5,third:8},
      // Horizontal combo
      {first:0,second:1,third:2},
      {first:3,second:4,third:5},
      {first:6,second:7,third:8},
      // Diagonal combo
      {first:0,second:4,third:8},
      {first:2,second:4,third:6},
    ]       
  }

  fillCell(cell:number): void{
    if (this.validPlay(cell) && !this.finished){
      // Mark Cell for Player
      this.cells[cell] = this.activePlayer
      this.checkWinner();
      // Change Turn
      if (this.activePlayer == this.players[1].num)
        this.activePlayer = this.players[0].num
      else if(this.activePlayer == this.players[0].num){
        this.activePlayer = this.players[1].num
      }
    }
  }

  validPlay(cell:number){
    if (this.cells[cell]==0)
      return true;
    return false;
  }

  checkWinner():void{
    this.possibleCombinations.forEach(combo => {
      if (
        ((this.cells[combo.first] == this.cells[combo.second]) && (this.cells[combo.first] == this.cells[combo.third]) && (this.cells[combo.second] == this.cells[combo.third])) &&
        (this.cells[combo.first] !=0 && this.cells[combo.second] !=0 && this.cells[combo.third])){
          this.game.message = `The winner is Player ` + this.cells[combo.first]
          this.dialog.open(ModalComponent);
        if (this.cells[combo.first] == this.players[0].num)
          this.players[0].score++
        else if(this.cells[combo.first] == this.players[1].num)
          this.players[1].score++
        this.finished=true
      }
    });
    console.log(this.cells.includes(0));  
    console.log(this.finished);     
    if(!this.cells.includes(0) && !this.finished){
      this.game.message = `Its a Draw`
      this.dialog.open(ModalComponent);
      this.finished=true
    }
  }

  resetBoard():void{
    this.activePlayer = this.players[0].num
    this.cells = Array(this.qtyCells).fill(0)
    this.finished=false;
    console.log(this.cells);
    
  }
}
