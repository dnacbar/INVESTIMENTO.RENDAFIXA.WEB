import { ConsultaExtrato } from './../../../service/consulta-extrato';
import { Component, inject, input } from '@angular/core';
import { Lista } from '../lista/lista';
import { Extrato } from '../../../model/extrato';
import { catchError, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-index-extrato',
  imports: [Lista],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {
  public idInvestimentoInput = input<string>('');

  private consultaExtrato = inject(ConsultaExtrato);

  public listaDeExtratoSignal = toSignal(
    toObservable(this.idInvestimentoInput)
      .pipe(
        switchMap(id => {
          if (!id)
            return of([] as Extrato[]);

          return this.consultaExtrato.listaExtrato(id)
            .pipe(catchError(err => {
              alert('Erro ao carregar extrato.');
              console.error('Erro ao carregar extrato.', err);
              return of([] as Extrato[]);
            }));
        })
      ), { initialValue: [] as Extrato[] });
}