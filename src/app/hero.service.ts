import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private heroesUrl = 'http://localhost:8080/apiteste/heroes';

  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
        tap(_ => this.log('fetched heroes'))
      );
    return heroes;
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => {
        this.log(`updated hero id=${hero.id}`);
        this.messageService.showSuccessMessage(`Hero ${hero.name} updated!`);
      })
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero): Observable<Hero> {
    const id = hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => {
        this.log(`deleted hero id=${id}`);
        this.messageService.showSuccessMessage(`Hero ${hero.name} deleted!`);
      })
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((h: Hero) => {
        this.log(`added hero w/ id=${hero.id}`);
        this.messageService.showSuccessMessage(`Hero ${h.name} added!`);
      })
    );
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

}
