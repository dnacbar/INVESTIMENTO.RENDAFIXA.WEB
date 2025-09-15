import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from "./component/menu/menu";

@Component({
  selector: 'app-root',
  imports: [RouterModule, Menu],
  templateUrl: './app.html',
})
export class App {
  
}