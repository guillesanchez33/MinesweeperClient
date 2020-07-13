import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Game } from '../model/game';

@Injectable()
export class GameService {
  url="http://localhost:8080/";
  service = "game";

  constructor(private _http: HttpClient) {
  }

  setEndpoint(urlEndPoint){
    this.url = urlEndPoint;
  }

  digCell(game, i) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/dig/" + game.id + "/" + i, {
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

  getNewGame(x,y,mines) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/new/" + x + "/" + y + "/" + mines, {
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

  pauseGame(gameId:string) {
    let params: HttpParams = new HttpParams();
    return this._http
      .get(this.url + this.service + "/pause/" + gameId , {
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