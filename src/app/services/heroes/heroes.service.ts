import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from 'src/app/interfaces/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Array<Hero>> {
    return this.http.get<Array<Hero>>(`${this.url}`);
  }

  getHeroId(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/${id}`);
  }
  getHeroName(name: string): Observable<Array<Hero>> {
    return this.getAllHeroes().pipe(map(heroes => {
      if (name) {
        return heroes.filter(hero => hero.name?.toLowerCase().includes(name.toLowerCase()));
      }
      else
        return heroes
    }))
  }

  add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.url}/${hero.id}`, hero);
  }

  delete(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.url}/${id}`);
  }
}
