import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../classes/team';
import { baseURL } from '../shared/baseurl';
import { Member } from '../classes/member';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  // retrieve the list of teams
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(baseURL);
  }
}
