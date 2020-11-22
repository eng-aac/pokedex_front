import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'http://localhost:3000/api/pokemon';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Pokemon[]> {
    return this.http.get(this.baseUrl).pipe(map(data => data as Pokemon[]));
  }

  getOne(id_pokemon: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id_pokemon}`, {headers: this.httpHeaders});
  }

  browse(name: any): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/browse/${name}`, {headers: this.httpHeaders});
  }

  post(Pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.baseUrl}/`, Pokemon, {headers: this.httpHeaders});
  }

  delete(id_pokemon: number): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${this.baseUrl}/${id_pokemon}`, {headers: this.httpHeaders});
  }
}
