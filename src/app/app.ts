import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from "./investidor/component/menu/menu";
import { InvestidorDataBinding } from './investidor/service/investidor-data-binding';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, Menu],
  templateUrl: './app.html',
})
export class App {
}