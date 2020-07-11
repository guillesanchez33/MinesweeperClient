import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { Game } from './model/game';
import { Cell } from './model/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MinesweeperFront';
  sizeX  = 8;
  sizeY  = 8;
  dark = true;
  game:Game;
  firstDark = true;
  dig = true;

  constructor(private _gameService: GameService) {    

  }

  printCellInfo(n:Cell){
    switch(n.info){
      case "Empty":
        return "";
      case "One":
          return "1";
      case "Two":
          return "2";
      case "Three":
          return "3";
      case "Four":
          return "4";
      case "Five":
          return "5";
      case "Flag":
        return "?";
    }
    return "";
  }

  digCell(n:Cell,i){
    console.log(n.info);
    if(!n.revealed && this.game.state == "Playing") {
      if(this.dig){
        this._gameService.digCell(this.game, i).subscribe(
          res => {
            this.game = JSON.parse(res.body);
            if(this.game.state == "Win"){
              alert("Congratulations! YOU WIN");
            } else if(this.game.state == "Lose"){
              alert("YOU LOSE :-(    Try again!! practice makes perfect");
            }
          },
          error => console.error('DIG CELL: ', error)
        )
      } else {
        this._gameService.flagCell(this.game, i).subscribe(
          res => {
            this.game = JSON.parse(res.body);
            console.log('DIG CELL: ', this.game)
          },
          error => console.error('DIG CELL: ', error)
        )
      }
    } else {
      alert("This game is over. Try a new one!!");
    }
  }


  newGame(){
    this._gameService.getMewGame().subscribe(
      res => {
        this.game = JSON.parse(res.body);
        console.log('NEW GAME: ', this.game)
      },
      error => console.error('NEW GAME: ',error)
    )
  }

  openGame(){
    this._gameService.getOpenGame("c60ac696-78cb-4471-b608-2e3053cc2461").subscribe(
      res => {
        this.game = JSON.parse(res.body);
        console.log('OPEN GAME: ', this.game)
      },
      error => console.error('OPEN GAME: ',error)
    )
  }

  getColor(n:Cell,i){
    this.dark = !this.dark;

    if(i == 0){
      this.dark = true;
      this.firstDark = true;
    }else if((i+1)%this.game.board.sizeX != 0 ){
      this.firstDark = !this.firstDark;
      this.dark = this.firstDark;
    }
    if(!n.revealed) {
      if(this.dark){
        return 'greenDark';
      } else {
        return 'greenSoft';
      }
    } else {
      if(this.dark){
        return 'grayDark';
      } else {
        return 'graySoft';
      }
    }
  }

  setDig(){
    this.dig=true;
  }

  setFlag(){
    this.dig=false;
  }

  getDigButtonStyle(){
    if(this.dig){
      return 'accent';
    }
    return 'accent';
  }

  getFlagButtonStyle(){
  }
}
