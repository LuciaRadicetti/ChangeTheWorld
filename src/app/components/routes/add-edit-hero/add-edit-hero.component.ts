import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../../services/heroes/heroes.service';
import { Hero } from '../../../interfaces/Hero';

@Component({
  selector: 'app-add-edit-hero',
  templateUrl: './add-edit-hero.component.html',
  styleUrls: ['./add-edit-hero.component.css']
})
export class AddEditHeroComponent {
  idHero!: number;
  formHero!: FormGroup;
  hero!: Hero;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private HeroesService: HeroesService, private router: Router) {
    this.idHero = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || '');

    this.formHero = fb.group({
      name: [null, Validators.required],
      fullName: [null, Validators.required],
      ability: [null]
    });
    this.idHero != 0 ? this.getHeroId() : ''
  }

  getHeroId() {
    this.HeroesService.getHeroId(this.idHero).subscribe({
      next: response => {
        this.formHero.setValue({
          name: response.name,
          fullName: response.fullName,
          ability: response.ability
        })
        this.hero = response;
      },
      error: error => {
        console.log(error);
      },
    });
  }
  editHero(hero: Hero) {
    this.HeroesService.update(hero).subscribe({
      next: response => {
        this.router.navigate(['home']);
      },
      error: error => {
        console.log(error);
      },
    });
  }
  createHero(hero: Hero) {
    this.HeroesService.add(hero).subscribe({
      next: response => {
        this.router.navigate(['home']);
      },
      error: error => {
        console.log(error);
      },
    });
  }
  submit() {
    let hero: Hero = Object.assign({}, this.hero, {
      name: this.formHero.value.name,
      fullName: this.formHero.value.fullName,
      ability: this.formHero.value.ability

    })
    this.idHero != 0 ? this.editHero(hero) : this.createHero(hero)
  }

}
