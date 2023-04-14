import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Hero } from 'src/app/interfaces/Hero';
import { HeroesService } from '../../../services/heroes/heroes.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  heroes: Array<Hero> = [];
  heroesFilter: Array<Hero> = [];
  searchForm!: FormGroup

  displayedColumns: string[] = ['ID', 'name', 'fullName', 'ability', 'action'];
  dataSource!: MatTableDataSource<Hero, MatTableDataSourcePaginator>

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private HeroesService: HeroesService, public dialog: MatDialog, private fb: FormBuilder) { 
    this.searchForm = this.fb.group({
      searchId: [null, Validators.required]
    })
  }

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

  getHeroId(){
    this.searchForm.value.searchId ?
    this.HeroesService.getHeroId(this.searchForm.value.searchId).subscribe({
      next: response => {
        this.heroesFilter = [response]
        this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      },
      error: error => {
        console.log(error);
      },
    })
    : this.getAllHeroes();
  }

   getHeroName(name: string){
     this.HeroesService.getHeroName(name).subscribe({
      next: response => {
        this.heroesFilter = response;
        this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      },
      error: error => {
        console.log(error);
      },
    })
    
  }

  searchHeroName($event?: any){
    let filter = $event.currentTarget.value || "";
    if (!filter) {
      this.heroesFilter = this.heroes;
      this.dataSource = new MatTableDataSource<Hero>(this.heroesFilter);
      this.dataSource.paginator = this.paginator;
      return;
    }else
      this.getHeroName(filter)
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    hero: Hero
  ): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.dataModal = {
      title: `Delete hero ${hero.name}?`,
      buttonAccept: 'Delete',
      buttonCancel: 'Cancel',
    };
    instance.dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) this.deleteHero(hero.id)
    });
  }

  deleteHero(id: number){
    this.HeroesService.delete(id).subscribe({
      next: response => {
        this.getAllHeroes()
      },
      error: error => {
        console.log(error);
      },
    })
  }

}
