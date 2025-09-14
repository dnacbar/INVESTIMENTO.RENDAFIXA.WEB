import { ListaInvestimentoQueNaoEstaLiquidadoResult } from './../service/result/lista-investimento-que-nao-esta-liquidado-result';
import { EnumIndexador } from './enum/enum-indexador';

export class Investimento {
    public idInvestimento = '';
    public idInvestidor = '';
    public txDocumentoFederal = '';
    public nmValorInicial = 0;
    public nmValorFinal = 0;
    public nmValorImposto = 0;
    public nmTaxaRendimento = 0;
    public nmTaxaAdicional = 0;
    public dtInicial = new Date();
    public dtFinal = new Date();
    public boLiquidado = false;
    public boIsentoImposto = false;
    public enumIndexador = EnumIndexador.Pre;

    public exibeLiquidado(): string {
        return this.boLiquidado ? 'Sim' : 'Não';
    }

    public exibeIndexador(): string {
        switch (this.enumIndexador) {
            case EnumIndexador.Pre:
                return 'Pré';
            case EnumIndexador.Cdi:
                return 'CDI';
            case EnumIndexador.Ipca:
                return 'IPCA';
            case EnumIndexador.Selic:
                return 'Selic';
            case EnumIndexador.Igpm:
                return 'IGPM';
            case EnumIndexador.Incc:
                return 'INCC';
            default:
                return 'Desconhecido';
        }
    }

    public exibeIsentoImposto(): string {
        return this.boIsentoImposto ? 'Sim' : 'Não';
    }

    public static converteInvestimento(result: ListaInvestimentoQueNaoEstaLiquidadoResult): Investimento {
        const investimento = new Investimento();

        investimento.idInvestimento = result.investimento;
        investimento.idInvestidor = result.investidor;
        investimento.txDocumentoFederal = result.docFederal;
        investimento.boLiquidado = result.liquidado;
        investimento.nmValorInicial = result.vlInicial;
        investimento.nmValorFinal = result.vlFinal;
        investimento.nmValorImposto = result.vlImposto;
        investimento.nmTaxaRendimento = result.taxaRendimento;
        investimento.nmTaxaAdicional = result.taxaAdicional;
        investimento.dtInicial = new Date(result.dtInicial);
        investimento.dtFinal = new Date(result.dtFinal);
        investimento.enumIndexador = result.indexador;
        investimento.boIsentoImposto = result.isentoImposto;

        return investimento;
    }
}