import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Game } from '../model/game';

@Injectable()
export class GameService {
  public url="http://localhost:8080/";
  public service = "game";

  constructor(private _http: HttpClient) {
  }

  digCell(game, i) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/" + game.id + "/" + i, {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders(),
        params: params
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  flagCell(game, i) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/flag/" + game.id + "/" + i, {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders(),
        params: params
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getAllGames() {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/all", {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders(),
        params: params
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getMewGame() {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "", {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders(),
        params: params
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  
  getOpenGame(gameId:string) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/open/" + gameId , {
        responseType: "text",
        observe: "response",
        headers: new HttpHeaders(),
        params: params
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}