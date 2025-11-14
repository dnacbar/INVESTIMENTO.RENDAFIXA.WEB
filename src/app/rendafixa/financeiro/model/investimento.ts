import { ListaInvestimentoResult } from '../service/result/lista-investimento-result';
import { EnumIndexador } from './enum/enum-indexador';
import { DataExtension } from '../../../library/extension/data-extension';
import { ListaInvestimentoComResgateDisponivelResult } from '../service/result/lista-investimento-com-resgate-disponivel-result';

export class Investimento {
    public idInvestimento = '';
    public idInvestidor = '';
    public txDocumentoFederal = '';
    public nmValorInicial = 1;
    public nmValorFinal = 0;
    public nmValorImposto = 0;
    public nmTaxaRendimento = 100;
    public nmTaxaAdicional = 0;
    public dtInicial: Date | string = new Date();
    public dtFinal: Date | string = new Date();
    public nmDiasCarencia = 0;
    public boIsentoImposto = false;
    public boLiquidezDiaria = false;
    public enumIndexador = EnumIndexador.Pre;
    public nmValorBloqueadoTotal = 0;
    public boLiquidado = false;
    public boCarregandoInvestimento = false;

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

    public exibeLiquidado(): string {
        return this.boLiquidado ? 'Sim' : 'Não';
    }

    public exibeLiquidezDiaria(): string {
        return this.boLiquidezDiaria ? 'Sim' : 'Não'
    }

    public verificaSeDataFinalEhMaiorQueDataInicial() {
        return DataExtension.verificaSeDataEhMaiorQueOutraData(this.dtFinal, this.dtInicial);
    }

    public verificaSeDataInicialEhMaiorOuIgualQueDataAtual() {
        return DataExtension.verificaSeDataEhMaiorOuIgualOutraData(this.dtInicial, new Date());
    }

    public static converteInvestimento(result: ListaInvestimentoResult): Investimento {
        const investimento = new Investimento();

        if (!result)
            return investimento;

        investimento.idInvestimento = result?.investimento;
        investimento.idInvestidor = result?.investidor;
        investimento.txDocumentoFederal = result?.docFederal;
        investimento.boLiquidado = result?.liquidado;
        investimento.nmValorInicial = result?.vlInicial;
        investimento.nmValorFinal = result?.vlFinal;
        investimento.nmValorImposto = result?.vlImposto;
        investimento.nmTaxaRendimento = result?.taxaRendimento / 100;
        investimento.nmTaxaAdicional = result?.taxaAdicional / 100;
        investimento.dtInicial = new Date(result?.dtInicial);
        investimento.dtFinal = new Date(result?.dtFinal);
        investimento.enumIndexador = result?.indexador;
        investimento.boIsentoImposto = result?.isentoImposto;
        investimento.boLiquidezDiaria = result?.liquidezDiaria;
        investimento.nmDiasCarencia = result?.diasCarencia;
        investimento.nmValorBloqueadoTotal = result?.vlBloqueadoTotal;

        return investimento;
    }

    public static converteInvestimentoComResgateDisponivel(result: ListaInvestimentoComResgateDisponivelResult): Investimento {
        const investimento = new Investimento();

        if (!result)
            return investimento;

        investimento.idInvestimento = result?.investimento;
        investimento.nmValorFinal = result?.vlDisponivel;
        investimento.boLiquidezDiaria = true;

        return investimento;
    }
}