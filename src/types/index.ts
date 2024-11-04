export interface TrailerPool {
  id: string;
  locationId: string;
  locationName: string;
  loadsInbound: number;
  loadsOutbound: number;
  totalLoads: number;
  averageTurnsPerWeek: number;
  averageChargePerLoad: number;
  requiredTrailers: number;
}

export interface ChangeLogEntry extends TrailerPool {
  timestamp: string;
  user: string;
  action: 'update' | 'create' | 'delete';
}

export interface TrailerCost {
  monthlyOwnershipCost: number;
  lastUpdated: string;
  lastUpdatedBy: string;
}

export interface MarketArea {
  id: string;
  marketArea: string;
  marketName: string;
  country: string;
  loadsInbound: number;
  loadsOutbound: number;
  totalLoads: number;
  marginInbound: number;
  marginOutbound: number;
  fma: string;
  isInMarket: boolean;
}

export interface MarketChangeLogEntry extends Omit<MarketArea, 'isInMarket'> {
  timestamp: string;
  user: string;
  action: 'update' | 'create' | 'delete';
  field: string;
  oldValue: string;
  newValue: string;
}

export interface CostSetting {
  id: string;
  operationCode: string;
  settingName: string;
  settingSource: string;
  settingBasis: string;
  effectiveDateTime: string;
  value: number | string;
}

export interface CostChangeLogEntry extends CostSetting {
  timestamp: string;
  user: string;
  action: 'update' | 'create' | 'delete';
  field: string;
  oldValue: string;
  newValue: string;
}