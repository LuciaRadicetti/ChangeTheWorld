import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Heroes } from 'src/app/interfaces/Heroes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  
  displayedColumns: string[] = ['ID', 'name', 'fullName', 'ability', 'action'];
  dataSource = new MatTableDataSource<Heroes>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}
const ELEMENT_DATA: Heroes[] = [
  {id: 1, name: "Batman", fullName:"Batmann", ability:"volar"},
  {id: 1, name: "Batman", fullName:"Batmann", ability:"volar"},
  {id: 1, name: "Batman", fullName:"Batmann", ability:"volar"},
  {id: 1, name: "Batman", fullName:"Batmann", ability:"volar"},
  {id: 1, name: "Batman", fullName:"Batmann", ability:"volar"},
];
