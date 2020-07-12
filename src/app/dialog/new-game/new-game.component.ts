import { Component, OnInit, Inject } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { OpenGameComponent } from '../open-game/open-game.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpenGameComponent>, @Inject(MAT_DIALOG_DATA) public data: string, 
  private _gameService: GameService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  confirm(value){
    this.dialogRef.close(value);
  }
}
