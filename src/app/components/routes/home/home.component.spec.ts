import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('Test HomeComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClient
      ]
    })
    .compileComponents();

  });

  it('Exist HomeComponent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test agregar id en input para poder buscar', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const searchId = component.searchForm.controls['searchId']
    searchId.setValue(1)
    expect(component.searchForm.invalid).toBeFalse();
  });

  it('Test searchId', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const btnElemnt = fixture.debugElement.query(By.css('button.btn'))
    btnElemnt.nativeElement.click()
    expect(component.searchForm.value.searchId).toBePositiveInfinity()
  });
});


