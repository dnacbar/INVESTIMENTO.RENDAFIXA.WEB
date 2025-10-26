import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuPrincipal } from './rendafixa/menu/component/menu';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, MenuPrincipal],
  templateUrl: './app.html',
})
export class App {
}