import { ConsultaInvestimento } from '../../../service/consulta-investimento';
import { Component, inject, signal, effect } from '@angular/core';
import { Investimento } from '../../../model/investimento';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { Router } from '@angular/router';
import { TabelaRendaFixaDataBinding } from '../../../../../library/service/tabela-renda-fixa-data-binding';
import { Observable, switchMap, of, catchError, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { Lista } from '../lista/lista';
import { Visualiza } from '../visualiza/visualiza';
import { Index as IndexExtrato } from "../../extrato/index";

@Component({
  selector: 'app-index',
  imports: [Lista, Visualiza, IndexExtrato],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
  public investimentoSignal = signal<Investimento | null>(null);

  private consultaInvestimento = inject(ConsultaInvestimento);
  private investidorDataBinding = inject(InvestidorDataBinding);
  private router = inject(Router);

  private tabelaRendaFixaDataBinding = inject(TabelaRendaFixaDataBinding<Investimento>);

  public listaDeInvestimentoSignal = toSignal(
    this.investidorDataBinding.investidorEmitter$.pipe(
      // Ação lateral: Executa a habilitação do investidor no início do fluxo
      tap(() => this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(true)),

      // switchMap: Cancela a requisição anterior e inicia uma nova quando o investidor muda
      switchMap(investidor => {
        if (investidor.verificaSeEstaVazio()) {
          // Se o investidor estiver vazio, retorna um Observable vazio
          return of([]);
        }

        // Caso contrário, consulta a lista de investimento
        return this.consultaInvestimento.listaInvestimento(investidor).pipe(
          // Tratamento de Erro na requisição (mantém o fluxo principal ativo)
          catchError(err => {
            console.error('Erro na consulta de investimento:', err);
            return of([]);
          })
        );
      })
    ),
    {
      // Valor inicial
      initialValue: [] as Investimento[]
    }
  );

  public investimentoSelecionadoExterno = toSignal(this.tabelaRendaFixaDataBinding.eventoEnviaItemSelecionado$ as Observable<Investimento>, { initialValue: null });

  constructor() {
    effect(() => {
      const lista = this.listaDeInvestimentoSignal();

      if (lista.length > 0 && this.investimentoSignal() === null) {
        this.investimentoSignal.set(lista[0]);
      } else if (lista.length === 0) {
        this.investimentoSignal.set(null);
      }
    });

    effect(() => {
      const selecionado = this.investimentoSelecionadoExterno();
      if (selecionado) {

        this.investimentoSignal.set(selecionado);
      }
    });
  }

  public adicionaInvestimento(): void {
    this.router.navigateByUrl('/investimento/adiciona');
  }

  public irParaHome(): void {
    this.router.navigateByUrl('/home');
  }

}