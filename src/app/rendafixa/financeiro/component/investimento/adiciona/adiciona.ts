import { ListaEnumIndexadorDescricao, IEnumIndexadorDescricao } from '../../../model/enum/enum-indexador';
import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManipulaInvestimento } from '../../../service/manipula-investimento';
import { Router } from '@angular/router';
import { Investimento } from '../../../model/investimento';
import { NgxMaskDirective } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';

@Component({
  selector: 'app-adiciona-investimento',
  templateUrl: './adiciona.html',
  styleUrls: ['./adiciona.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective]
})
export class Adiciona implements OnInit, OnDestroy {
  public investimentoModel = model<Investimento>(new Investimento());
  public listaEnumIndexadorDescricao = signal<IEnumIndexadorDescricao[]>(ListaEnumIndexadorDescricao);
  public enumIndexadorDescricao = this.listaEnumIndexadorDescricao()[0];

  private location = inject(Location);
  private manipulaInvestimento = inject(ManipulaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public adicionaInvestimento() {
    this.investimentoModel().enumIndexador = this.enumIndexadorDescricao.id;
    this.manipulaInvestimento.adicionaInvestimento(this.investimentoModel().converteEmSignatureAdicionaInvestimento())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/investimento']);
            return;
          }
          this.investimentoModel().boCarregandoInvestimento = false;
        },
        error: (err) => {
          console.log(err);
          this.investimentoModel().boCarregandoInvestimento = false;
        }
      });
  }

  public volta(): void {
    this.location.back();
  }
}
