export interface IArticoli {
    codArt : string
    descrizione : string
    um : string
    codStat: boolean
    pzCart : number
    pesoNetto : number
    prezzo : number
    idStatoArt: string
    descrStatoArt: string
    dataCreazione: Date
    imageUrl: string
    iva: IIva
    famAssort: ICategoria
    barcode: IBarcode[]
}

export class ArticoloEmpty implements IArticoli {
  codArt = ''
  codStat = true
  dataCreazione = new Date()
  descrizione = ''
  imageUrl = ''
  pesoNetto = 0
  prezzo = 0
  idStatoArt = ''
  descrStatoArt = ''
  pzCart = 0
  um = 'PZ'
  iva = {
    idIva : -1,
    descrizione : '',
    aliquota : -1
  }
  famAssort = {
    id : -1,
    descrizione : ''
  }
  barcode = [{ barcode:'', idTipoArt: ''}]
}

export interface IBarcode {
  barcode : string
  idTipoArt : string
}

export interface ICategoria {
  id : number
  descrizione : string
}

export interface IIva {
  idIva : number
  descrizione : string
  aliquota: number
}

