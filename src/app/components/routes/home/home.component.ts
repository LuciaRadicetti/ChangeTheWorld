import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Hero } from 'src/app/interfaces/Hero';
import { HeroesService } from '../../../services/heroes/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  heroes: Array<Hero> = [];
  heroesFilter: Array<Hero> = [];

  displayedColumns: string[] = ['ID', 'name', 'fullName', 'ability', 'action'];
  dataSource!: MatTableDataSource<Hero, MatTableDataSourcePaginator>

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.HeroesService.getAllHeroes().subscribe({
      next: response => {
        this.heroes = this.heroesFilter = response;
        this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      },
    });
  }

  getHeroId(id: number){
    this.HeroesService.getHeroId(id).subscribe({
      next: response => {
        this.heroesFilter = [response]
        this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      },
      error: error => {
        console.log(error);
      },
    });
  }
  searchHeroId($event?: any){
    let filter = $event.currentTarget.value || "";
    if (!filter) {
      this.heroesFilter = this.heroes;
      this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      return;
    }else
     this.getHeroId(filter)
  }
  searchHeroName($event?: any){
    let filter = $event.currentTarget.value || "";
    if (!filter) {
      this.heroesFilter = this.heroes;
      this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      return;
    }
    let regex = new RegExp(filter, "i");
    this.heroesFilter = this.heroes.filter((hero) => {
      return regex.test(hero.name) ;
    });
    this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
  }

}
