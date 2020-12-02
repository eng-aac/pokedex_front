import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'http://localhost:3000/api/team';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Team[]> {
    return this.http.get(this.baseUrl).pipe(map(data => data as Team[]));
  }

  getOne(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }

  post(Team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/`, Team, {headers: this.httpHeaders});
  }

  update(id: number, Team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${id}`, Team, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
