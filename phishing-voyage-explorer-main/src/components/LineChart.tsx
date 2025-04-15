
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { YearlyData } from '@/types';

interface LineChartProps {
  data: YearlyData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Nettoyer le contenu existant
    d3.select(chartRef.current).selectAll("*").remove();

    // Dimensions et marges
    const margin = { top: 30, right: 30, bottom: 50, left: 80 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Créer le SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Définir les échelles
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year) as [number, number])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) as number * 1.1])
      .range([height, 0]);

    // Ajouter les axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d => d.toString()))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("fill", "#fff");

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => d3.format(".0s")(d as number)))
      .selectAll("text")
      .attr("fill", "#fff");

    // Ajouter les titres des axes
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .text("Année");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .text("Nombre d'attaques");

    // Définir le générateur de ligne
    const line = d3.line<YearlyData>()
      .x(d => x(d.year))
      .y(d => y(d.count))
      .curve(d3.curveMonotoneX);

    // Ajouter le chemin de la ligne
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#8B5CF6")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Animation de la ligne
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0);

    // Ajouter des points
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.count))
      .attr("r", 6)
      .attr("fill", "#8B5CF6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .delay((_, i) => i * 150)
      .duration(500)
      .attr("r", 6);

    // Ajouter le titre du graphique
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .attr("fill", "#fff")
      .text("Évolution des attaques de phishing au fil des années");

    // Ajouter un tooltip
    const tooltip = d3.select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(30, 30, 30, 0.9)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    svg.selectAll(".dot-area")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot-area")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.count))
      .attr("r", 10)
      .attr("opacity", 0)
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`<strong>Année: ${d.year}</strong><br/>Attaques: ${d.count.toLocaleString()}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

  }, [data]);

  return (
    <div className="w-full bg-slate-900 rounded-lg p-4">
      <div ref={chartRef} className="w-full h-[300px]"></div>
    </div>
  );
};

export default LineChart;
