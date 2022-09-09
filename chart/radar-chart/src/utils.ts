import { range, max } from "d3-array";
import { format as d3Format } from "d3-format";
import { path } from "d3-path";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { BaseType, create, select, selectAll, Selection } from "d3-selection";
import { areaRadial, curveCatmullRomClosed, curveLinearClosed, lineRadial } from "d3-shape";
import "d3-transition";

import { IData, IRadarChart } from "./interface";

export const drawRadar = (props: IRadarChart) => {
  const {
    areaColors = ["rgb(105, 173, 87)", "rgb(209, 53, 43)"],
    data,
    dotBg = "#737373",
    dotRadius = 3, // The size of the colored circles of each blob
    gridBg = "#fff",
    height = 600,
    labelFactor = 1.1, // How much farther than the radius of the outer circle should the labels be placed
    levels = 10, // How many levels or inner circles should there be drawn
    linesColor = "#DDD",
    margin = { top: 50, bottom: 50, left: 50, right: 50 },
    maxValue = 10, // What is the value that the biggest circle will represent
    opacityArea = 0.3, // The opacity of the area of the blob
    opacityCircles = 0.2, // The opacity of the circles of each blob
    renderIndicatorValue = d3Format("~"),
    renderTooltipValue = d3Format("~"),
    roundStrokes = false, // If true the area and stroke will follow a round path (cardinal-closed
    showIndicator = true,
    strokeWidth = 4, // The width of the stroke around each blob
    type = "polygon",
    width = 600,
  } = props;

  const svg = create("svg")
    .attr("height", height)
    .attr("width", width)
    .style("font-family", "sans-serif")
    .style("overflow", "visible")
    .style("font-size", 12);

  const c = scaleOrdinal().range(areaColors);

  // If supplied maxValue is smaller than the actual one, replace by the max in the data
  const maxVal = Math.max(maxValue, max(data, (i: IData[]) => Number(max(i.map(o => o.value)))) || 0);

  const allAxis = data[0].map(i => i.axis); // Names of each axis
  const total = allAxis.length; // number of different axis
  const radius = Math.min(
    width / 2 - margin.left / 2 - margin.right / 2,
    height / 2 - margin.top / 2 - margin.bottom / 2,
  ); // radius of the outermost circle
  const angleSlice = (Math.PI * 2) / total; // width in radians of each slice

  const r = scaleLinear().domain([0, maxVal]).range([0, radius]);

  const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

  /// / Draw the Circular grid
  const axisGrid = g.append("g").attr("class", "axisWrapper");

  if (type === "circle") {
    // Draw background circles
    axisGrid
      .selectAll(".levels")
      .data(range(1, levels + 1).reverse())
      .join("circle")
      .attr("class", "gridCircle")
      .attr("r", d => (radius / levels) * d)
      .style("fill", gridBg)
      .style("stroke", linesColor)
      .style("fill-opacity", opacityCircles);
  } else if (type === "polygon") {
    // Draw polygon background
    axisGrid
      .selectAll(".levels")
      .data(range(1, levels + 1).reverse())
      .join("g")
      .attr("class", "levels-group");

    axisGrid
      .selectAll("g.levels-group")
      .data(range(0, levels))
      .each(function (d) {
        const getX = (j: number) =>
          (r(maxVal * 1.01) + (-d * radius) / levels) * Math.cos(angleSlice * j - Math.PI / 2);
        const getY = (j: number) =>
          (r(maxVal * 1.01) + (-d * radius) / levels) * Math.sin(angleSlice * j - Math.PI / 2);

        function drawPolygon(context: any) {
          context.moveTo(getX(1), getY(1));
          range(2, total + 2).forEach(i => {
            context.lineTo(getX(i), getY(i));
          });
          context.closePath();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return context;
        }

        select(this)
          .append("path")
          .attr("d", drawPolygon(path()))
          .attr("fill", d === 0 ? gridBg : "none")
          .style("stroke", linesColor)
          .style("stroke-width", 1);
      });
  }

  if (showIndicator) {
    // Text indicating at what % each level is
    axisGrid
      .selectAll(".axisLabel")
      .data(range(1, levels + 1).reverse())
      .join("text")
      .attr("class", "axisLabel")
      .attr("x", 4)
      .attr("y", d => (-d * radius) / levels)
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .style("fill", "#737373")
      .text(d => renderIndicatorValue((maxVal * d) / levels));
  }

  /// / Draw axes
  const axis = axisGrid.selectAll(".axis").data(allAxis).join("g").attr("class", "axis");

  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (_d, i) => r(maxVal * 1.01) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y2", (_d, i) => r(maxVal * 1.01) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr("class", "line")
    .attr("stroke-width", 1)
    .style("stroke", linesColor);

  axis
    .append("text")
    .attr("class", "legend")
    .attr("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", (_d, i) => r(maxVal * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y", (_d, i) => r(maxVal * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
    .text(d => d);

  /// / Draw radar chart blobs
  const radarLine = lineRadial<IData>()
    .curve(curveLinearClosed)
    .radius(d => r(d.value))
    .angle((_d, i) => i * angleSlice);

  if (roundStrokes) {
    radarLine.curve(curveCatmullRomClosed.alpha(1));
  }

  // inner glow effect
  const inverseArea = areaRadial<IData>()
    .curve(curveLinearClosed)
    .innerRadius(d => r(d.value))
    .outerRadius(0)
    .angle((_d, i) => i * angleSlice);

  const defs = svg.append("defs");

  const filter = defs.append("filter").attr("id", "blur2");

  filter.append("feGaussianBlur").attr("stdDeviation", 15).attr("result", "blur2");

  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "blur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  defs
    .selectAll("clipPath")
    .data(data)
    .join("clipPath")
    .attr("id", (_d, i) => `clipPath-${i}`)
    .append("path")
    .attr("d", d => inverseArea(d));

  const blobWrapper: Selection<BaseType, IData[], any, unknown> = g
    .selectAll(".radarWrapper2")
    .data(data)
    .join("g")
    .attr("class", "radarWrapper2");

  // Append backgrounds
  blobWrapper
    .append("path")
    .attr("class", "radarArea2")
    .attr("d", d => radarLine(d) as string)
    .attr("fill", (_d, i): string => c(String(i)) as string)
    .style("fill-opacity", opacityArea)
    .on("mouseover", function () {
      // Dim all blobs
      selectAll(".radarArea2").transition().duration(200).style("fill-opacity", Math.min(0.1, opacityArea));
      // Bring back the hovered over blob
      select(this).transition().duration(200).style("fill-opacity", Math.max(0.7, opacityArea));
    })
    .on("mouseout", () => {
      // Bring back all blobs
      selectAll(".radarArea2").transition().duration(200).style("fill-opacity", opacityArea);
    });

  // Create outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", d => radarLine(d))
    .style("stroke", (_d, i): string => <string>c(i as unknown as string))
    .attr("stroke-width", strokeWidth)
    .style("fill", "none")
    .attr("clip-path", (_d, i) => `url(#clipPath-${i})`);

  // Append dots
  blobWrapper
    .selectAll(".radarCircle")
    .data(d => d)
    .join("circle")
    .attr("class", "radarCircle")
    .attr("r", dotRadius)
    .attr("cx", (d, i) => r(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("cy", (d, i) => r(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style("fill", dotBg)
    .style("fill-opacity", 0.8);

  /// / Append invisible circles for tooltip
  const blobCircleWrapper = g.selectAll(".radarCircleWrapper").data(data).join("g").attr("class", "radarCircleWrapper");

  const tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

  // Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(d => d)
    .join("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", dotRadius * 1.5)
    .attr("cx", (d, i) => r(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("cy", (d, i) => r(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function (_event: MouseEvent, d: IData) {
      const newX = parseFloat(select(this).attr("cx")) - 10;
      const newY = parseFloat(select(this).attr("cy")) - 10;

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .text(renderTooltipValue(d.value))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", () => {
      tooltip.transition().duration(200).style("opacity", 0);
    });

  return svg.node() as SVGElement;
};
