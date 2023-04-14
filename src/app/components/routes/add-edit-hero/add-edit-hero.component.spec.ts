import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

import { AddEditHeroComponent } from './add-edit-hero.component';

describe('Test AddEditHeroComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHeroComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ActivatedRoute,
        HttpClient
      ]
    })
    .compileComponents();

  });

  it('Exist AddEditHeroComponent', () => {
    const fixture = TestBed.createComponent(AddEditHeroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test validaciones form', () => {
    const fixture = TestBed.createComponent(AddEditHeroComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const name = component.formHero.controls['name']
    const fullname = component.formHero.controls['fullName']
    const ability = component.formHero.controls['ability']
    name.setValue('test')
    fullname.setValue('test')
    ability.setValue('test')

    expect(component.formHero.invalid).toBeFalse();
  });
});
