import { useEffect, useRef } from "react";

import { drawRadar } from "./utils";
import { IRadarChart } from "./interface";

export const RadarChart = (props: IRadarChart) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = drawRadar(props);

      while (chartRef.current.lastChild) {
        chartRef.current.removeChild(chartRef.current.lastChild);
      }

      chartRef.current.append(chart);
    }
  }, [chartRef.current]);

  return <div ref={chartRef} />;
};
