import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from 'src/app/interfaces/Hero';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

    it('Service create', () => {
        expect(service).toBeTruthy();
    });

    it('Test de get heroes', () => {
        const dummyHeroes: Hero[] = [{ id: 1, name: 'Heroe', fullName: 'Test', ability: 'TestAbility' }];

        service.getAllHeroes().subscribe((heroes) => {
        expect(heroes).toEqual(dummyHeroes);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/heroes');
        expect(req.request.method).toBe('GET');
        req.flush(dummyHeroes);
    });

    it('Test get Hero por id', () => {
        const dummyHero: Hero = { id: 1, name: 'Heroe', fullName: 'Test', ability: 'TestAbility' };
        const heroId = 1;

        service.getHeroId(heroId).subscribe((hero) => {
        expect(hero).toEqual(dummyHero);
        });

        const req = httpTestingController.expectOne(`http://localhost:3000/heroes/${heroId}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyHero);
    });
  
    it('Test get Hero por Name', () => {
      const dummyHeroes: Hero[] = [{ id: 1, name: 'Heroe', fullName: 'Test', ability: 'TestAbility' }];
      const searchName = 'He'; 
  
      service.getHeroName(searchName).subscribe((filteredHeroes) => {
        expect(filteredHeroes).toEqual([{ id: 1, name: 'Heroe', fullName: 'Test', ability: 'TestAbility' }]);
      });
  
      const req = httpTestingController.expectOne('http://localhost:3000/heroes');
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes);
    });
  
    it('Tes add hero', () => {
      const newHero: Hero = { id: 1, name: 'Heroe2', fullName: 'Test', ability: 'TestAbility' };
  
      service.add(newHero).subscribe((addedHero) => {
        expect(addedHero).toEqual(newHero);
      });
  
      const req = httpTestingController.expectOne('http://localhost:3000/heroes');
      expect(req.request.method).toBe('POST');
      req.flush(newHero);
    });
  
    it('Test update hero', () => {
      const updatedHero: Hero = { id: 1, name: 'Heroe', fullName: 'Test2', ability: 'TestAbility' };
  
      service.update(updatedHero).subscribe((result) => {
        expect(result).toEqual(updatedHero);
      });
  
      const req = httpTestingController.expectOne(`http://localhost:3000/heroes/${updatedHero.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedHero);
    });
  
    it('Test delete hero', () => {
      const heroIdToDelete = 1;
  
      service.delete(heroIdToDelete).subscribe((deletedHero) => {
        expect(deletedHero.id).toEqual(heroIdToDelete);
      });
  
      const req = httpTestingController.expectOne(`http://localhost:3000/heroes/${heroIdToDelete}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ id: heroIdToDelete });
    });
  });
  
