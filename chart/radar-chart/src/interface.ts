export interface IRadarChart {
  areaColors?: string[];
  data: IData[][];
  dotBg?: string;
  dotRadius?: number;
  gridBg?: string;
  height?: number;
  labelFactor?: number;
  levels?: number;
  linesColor?: string;
  margin?: Record<string, number>;
  maxValue?: number;
  opacityArea?: number;
  opacityCircles?: number;
  renderIndicatorValue?: (value: number) => string;
  renderTooltipValue?: (value: number) => string;
  roundStrokes?: boolean;
  showIndicator?: boolean;
  strokeWidth?: number;
  type?: "circle" | "polygon";
  width?: number;
}

export interface IData {
  axis: string;
  value: number;
}
