import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { Game } from './model/game';
import { Cell } from './model/cell';
import { MatDialog } from '@angular/material/dialog';
import { OpenGameComponent } from './dialog/open-game/open-game.component';
import { NewGameComponent } from './dialog/new-game/new-game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MinesweeperFront';
  sizeX = 8;
  sizeY = 8;
  dark = true;
  game: Game;
  firstDark = true;
  dig = true;

  constructor(private _gameService: GameService, public dialog: MatDialog) {

  }

  printCellInfo(n: Cell) {
    if(this.game.state == 'Lose' && n.mine){
      return "stars";
    }
    switch (n.info) {
      case "Empty":
        return "";
      case "One":
        return "looks_one";
      case "Two":
        return "looks_two";
      case "Three":
        return "looks_3";
      case "Four":
        return "looks_4";
      case "Five":
        return "looks_5";
      case "Six":
        return "looks_6";
      case "Seven":
          return "looks_7";
      case "Eight":
            return "looks_8";
      case "Flag":
        return "flag";
    }
    return "";
  }

  digCell(n: Cell, i) {
    console.log(n.info);
    if (!n.revealed && this.game.state == "Playing") {
      if (this.dig) {
        this._gameService.digCell(this.game, i).subscribe(
          res => {
            this.game = JSON.parse(res.body);
            if (this.game.state == "Win") {
              alert("Congratulations! YOU WIN");
            } else if (this.game.state == "Lose") {
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
    } 
  }


  newGame() {
    const dialogRef = this.dialog.open(NewGameComponent, { width: '300px', data: null }); 
    dialogRef.afterClosed().subscribe(result => { 
      console.log(result);
      if (result) { 
        //TODO: aca el result es el tipo de juego
        var x=10;
        var y=10;
        var mines=10;
        if(result == 'medium'){
          x=16;
          y=16;
          mines=30;
        } else if(result == 'hard'){
          x=22;
          y=22;
          mines=60;
        }else if(result == 'einstein'){
          x=30;
          y=30;
          mines=200;
        }

        console.log('calling new game');
        this._gameService.getNewGame(x,y,mines).subscribe(
          res => {
            this.game = JSON.parse(res.body);
          },
          error => console.error('NEW GAME: ', error)
          )
      }
     });
   /* this._gameService.getMewGame().subscribe(
      res => {
        this.game = JSON.parse(res.body);
        console.log('NEW GAME: ', this.game)
      },
      error => console.error('NEW GAME: ', error)
    )*/
  }

  openGame() {
    const dialogRef = this.dialog.open(OpenGameComponent, { width: '300px', data: null }); 
    dialogRef.afterClosed().subscribe(result => { 
      if (result) { 
        this._gameService.getOpenGame(result).subscribe(
          res => {
            this.game = JSON.parse(res.body);
          },
          error => console.error('OPEN GAME: ', error)
          )
      }
     });
  }

  getColor(n: Cell, i) {
    this.dark = !this.dark;

    if (i == 0) {
      this.dark = true;
      this.firstDark = true;
    } else if ((i + 1) % this.game.board.sizeX != 0) {
      this.firstDark = !this.firstDark;
      this.dark = this.firstDark;
    }
    if (!n.revealed) {
      if (this.dark) {
        return 'greenDark';
      } else {
        return 'greenSoft';
      }
    } else {
      if (this.dark) {
        return 'grayDark';
      } else {
        return 'graySoft';
      }
    }
  }

  setDig() {
    this.dig = true;
  }

  setFlag() {
    this.dig = false;
  }

  getDigButtonStyle() {
    if (this.dig) {
      return 'accent';
    }
    return 'accent';
  }

  getFlagButtonStyle() {
  }
}
