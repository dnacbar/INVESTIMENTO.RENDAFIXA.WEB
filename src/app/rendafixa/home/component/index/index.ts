import { GraficoBarComponent } from '../grafico-bar/grafico-bar';
import { InvestidorDataBinding } from './../../../investidor/service/investidor-data-binding';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [GraficoBarComponent],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index implements OnInit {
  private investidorDataBinding = inject(InvestidorDataBinding);

  ngOnInit(): void {
    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(false);
  }
}