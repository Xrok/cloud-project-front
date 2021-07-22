export interface MonitorFilter {
  search: string;
  OnStores: boolean;
  maxSize: number;
  minSize: number;
  // resolution:{width:number,height:number},
  minRefreshRate: number;
  maxRefreshRate: number;
  responseTime: number;
  resolutionType: string[];
  panelType: string[];
  ratios: string[];
  valuesResolutionType: string[];
  valuesPanelType: string[];
  valuesRatios: string[];
}
