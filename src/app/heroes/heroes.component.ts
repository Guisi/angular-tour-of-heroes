import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  heroFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  heroes: Hero[];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  constructor(private heroService: HeroService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(() => this.getHeroes() );
  }

  delete(hero: Hero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: 'Confirma a exclusão deste herói?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
      }
    });
  }

}
