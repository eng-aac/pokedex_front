import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamPokemon } from '../models/teamPokemon';

@Injectable({
  providedIn: 'root'
})
export class TeamPokemonService {

  private baseUrl = 'http://localhost:3000/api/team-pokemon';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) { }

  getAll(teamId: number): Observable<TeamPokemon[]> {
    return this.http.get<TeamPokemon[]>(`${this.baseUrl}/pokemons/${teamId}`);
  }

  post(TeamPokemon: TeamPokemon): Observable<TeamPokemon> {
    return this.http.post<TeamPokemon>(`${this.baseUrl}/`, TeamPokemon, {headers: this.httpHeaders});
  }
}
