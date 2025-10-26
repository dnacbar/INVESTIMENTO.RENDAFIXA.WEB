export class DataExtension {

    public static verificaSeDataEhMaiorOuIgualOutraData(dataUm: Date | string, dataDois: Date | string): boolean {
        if(typeof dataUm  === 'string')
            dataUm = new Date(dataUm + "T00:00:00");

        if(typeof dataDois === 'string')
            dataDois = new Date(dataDois + "T00:00:00");

        (dataUm as Date).setHours(0, 0, 0, 0);
        (dataDois as Date).setHours(0, 0, 0, 0);
        
        return dataUm >= dataDois;
    }

    public static verificaSeDataEhMaiorQueOutraData(dataUm: Date | string, dataDois: Date | string): boolean {
        if(typeof dataUm === 'string')
            dataUm = new Date(dataUm + "T00:00:00");

        if(typeof dataDois === 'string') 
            dataDois = new Date(dataDois + "T00:00:00");

        (dataUm as Date).setHours(0, 0, 0, 0);
        (dataDois as Date).setHours(0, 0, 0, 0);
        
        return dataUm > dataDois;
    }
}