import { Component } from '@angular/core';
import { Menu } from '../../investidor/component/menu/menu';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [Menu, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuPrincipal {

}
