export interface GainData {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainData;
  ltcg: GainData;
}

export interface CapitalGainsSection {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainsSection;
  ltcg: CapitalGainsSection;
}

export interface HarvestingSummary {
  preHarvest: {
    stcg: { profits: number; losses: number; net: number };
    ltcg: { profits: number; losses: number; net: number };
    realised: number;
  };
  postHarvest: {
    stcg: { profits: number; losses: number; net: number };
    ltcg: { profits: number; losses: number; net: number };
    realised: number;
  };
  savings: number;
}
