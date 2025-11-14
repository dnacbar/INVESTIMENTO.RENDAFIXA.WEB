import { ListaExtratoResult } from "../service/result/lista-extrato-result";

export class Extrato {
    public idInvestimento = '';
    public cdMovimento = 0;
    public nmValorMovimento = 0;
    public nmValorImposto = 0;
    public dtMovimento = new Date();
    public txTipoMovimento = '';

    public static converteExtrato(result: ListaExtratoResult): Extrato {
        const retorno = new Extrato();

        if (!result)
            return retorno;

        retorno.idInvestimento = result?.investimento;
        retorno.cdMovimento = result?.cdMovimento;
        retorno.nmValorMovimento = result?.vlMovimento;
        retorno.nmValorImposto = result?.vlImposto;
        retorno.dtMovimento = new Date(result?.dtMovimento);
        retorno.txTipoMovimento = result?.tpMovimento === 'I' ? 'Investimento' : 'Resgate';

        return retorno;
    }
}