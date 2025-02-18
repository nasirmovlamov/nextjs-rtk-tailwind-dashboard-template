export interface IBrigade {
  corpusId: number;
  corpusName: string;
  corpusSerialNumber: string;
  unitSerialNumber: string;
  unitName: string;
  unitId: number;
}

export interface IUpdateBrigade {
  corpusId: number;
  unitSerialNumber: number;
  unitName: string;
  id: number;
}

export interface ICreateBrigade {
  corpusId: number;
  unitSerialNumber: number;
  unitName: string;
}
