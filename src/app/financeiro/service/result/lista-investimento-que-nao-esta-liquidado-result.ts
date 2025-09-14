export interface ListaInvestimentoQueNaoEstaLiquidadoResult {
    investimento: string;        
    investidor: string;        
    docFederal: string;
    liquidado: boolean;
    vlInicial: number;         
    vlFinal: number;
    vlImposto: number;
    taxaRendimento: number;
    taxaAdicional: number;
    dtInicial: Date;
    dtFinal: Date;
    indexador: number;      
    isentoImposto: boolean;
}
