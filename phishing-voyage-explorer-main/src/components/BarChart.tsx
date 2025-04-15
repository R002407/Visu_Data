
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ContinentData } from '@/types';

interface BarChartProps {
  data: ContinentData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Nettoyer le contenu existant
    d3.select(chartRef.current).selectAll("*").remove();

    // Dimensions et marges
    const margin = { top: 30, right: 30, bottom: 70, left: 80 };
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
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) as number * 1.1])
      .range([height, 0]);

    // Ajouter les axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .attr("fill", "#fff");

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => d3.format(".0s")(d as number)))
      .selectAll("text")
      .attr("fill", "#fff");

    // Ajouter un titre aux axes
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .text("Continent");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .text("Nombre d'attaques");

    // Créer les barres
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name) as number)
      .attr("width", x.bandwidth())
      .attr("fill", d => d.color)
      .attr("y", height)
      .attr("height", 0)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count));

    // Ajouter des étiquettes de valeur sur chaque barre
    svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => (x(d.name) as number) + x.bandwidth() / 2)
      .attr("y", d => y(d.count) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .style("opacity", 0)
      .text(d => d3.format(".2s")(d.count))
      .transition()
      .duration(800)
      .delay((_, i) => i * 100 + 300)
      .style("opacity", 1);

    // Ajouter le titre du graphique
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .attr("fill", "#fff")
      .text("Attaques de phishing par continent");

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

    // Ajouter des zones interactives
    svg.selectAll(".bar-area")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-area")
      .attr("x", d => x(d.name) as number)
      .attr("width", x.bandwidth())
      .attr("y", 0)
      .attr("height", height)
      .attr("opacity", 0)
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.name}</strong><br/>Attaques: ${d.count.toLocaleString()}`);
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

export default BarChart;
