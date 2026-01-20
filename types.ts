
export enum LineType {
  TENEKE_800G = 'TENEKE_800G',
  VAKUM = 'VAKUM',
  YAGLI_10KG = 'YAGLI_10KG',
  KURU_SELE = 'KURU_SELE'
}

export enum VakumMachine {
  VAKUM_7_500G = 'VAKUM_7_500G',
  VAKUM_3_500G = 'VAKUM_3_500G',
  VAKUM_5_800G = 'VAKUM_5_800G'
}

export interface ProductionResult {
  totalSeles: number;
  totalWeightKg: number;
  totalPackages: number;
  totalBoxes: number;
  estimatedHours: number;
  fireAmountKg?: number;
  netWeightKg?: number;
  totalPallets?: number;
}
