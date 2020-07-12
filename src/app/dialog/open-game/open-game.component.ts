import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-open-game',
  templateUrl: './open-game.component.html',
  styleUrls: ['./open-game.component.scss']
})
export class OpenGameComponent implements OnInit {
  listGame:Game[];

  constructor(public dialogRef: MatDialogRef<OpenGameComponent>, @Inject(MAT_DIALOG_DATA) public data: string, 
            private _gameService: GameService) { 

  }

  ngOnInit(): void {
    this._gameService.getAllGames().subscribe(
      res => {
        this.listGame = JSON.parse(res.body);
        console.log('ALL GAMES: ', this.listGame)
      },
      error => console.error('ALL GAMES: ', error)
    )
  }

  onNoClick(){
    this.dialogRef.close();
  }

  confirm(value){
    this.dialogRef.close(value);
  }
}
