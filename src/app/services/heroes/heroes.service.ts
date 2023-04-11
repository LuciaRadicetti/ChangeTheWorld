import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/url.constants';
import { Hero } from 'src/app/interfaces/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Array<Hero>> {
    return this.http.get<Array<Hero>>(`${BASE_URL}/heroes`);
  }

  getHeroId(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${BASE_URL}/hero/${id}`);
  }

  add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${BASE_URL}/hero`, { hero });
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${BASE_URL}/hero/${hero.id}`, { hero });
  }

  delete(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${BASE_URL}/hero/${id}`);
  }
}
