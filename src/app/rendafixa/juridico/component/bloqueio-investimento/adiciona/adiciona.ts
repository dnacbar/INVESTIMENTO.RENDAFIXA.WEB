
import { Component, inject, model } from '@angular/core';
import { BloqueioInvestimento } from '../../../model/bloqueio-investimento';
import { Router } from '@angular/router';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { ManipulaBloqueioInvestimento } from '../../../service/manipula-bloqueio-investimento';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultaInvestimento } from '../../../../financeiro/service/consulta-investimento';
import { Investimento } from '../../../../financeiro/model/investimento';


@Component({
  selector: 'app-adiciona',
  imports: [FormsModule, CommonModule],
  templateUrl: './adiciona.html',
  styleUrl: './adiciona.scss'
})
export class Adiciona {
  public bloqueioInvestimentoModel = model<BloqueioInvestimento>(new BloqueioInvestimento());
  public listaDeInvestimentoModel = model<Investimento[]>([]);
  public investimentoModel = model<Investimento>(new Investimento());

  private consultaInvestimento = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private location = inject(Location);
  private manipulaBloqueio = inject(ManipulaBloqueioInvestimento);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.investidorDataBinding.investidorEmitter$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: x => {
          if (x.verificaSeEstaVazio()) {
            this.listaDeInvestimentoModel.set([]);
            return;
          }
          this.investimentoModel.set(new Investimento());

          this.consultaInvestimento.listaInvestimento(x)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: result => { this.listaDeInvestimentoModel.set(result); },
              error: err => console.error('Erro na consulta de investimento: ' + err),
            });
        },
        error: err => console.error('Erro ao selecionar o investidor: ' + err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public adicionaBloqueio() {
    this.bloqueioInvestimentoModel().boCarrengandoBloqueioInvestimento = true;
    this.bloqueioInvestimentoModel().idInvestimento = this.investimentoModel().idInvestimento;

    this.manipulaBloqueio.adicionaBloqueioInvestimento(this.bloqueioInvestimentoModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/bloqueio-investimento']);
          this.bloqueioInvestimentoModel().boCarrengandoBloqueioInvestimento = false;
        },
        error: (err) => {
          console.log(err);
          this.bloqueioInvestimentoModel().boCarrengandoBloqueioInvestimento = false;
        }
      });
  }

  public volta(): void {
    this.location.back();
  }
}
