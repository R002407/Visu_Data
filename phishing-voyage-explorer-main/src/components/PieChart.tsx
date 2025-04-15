
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PhishingType } from '@/types';

interface PieChartProps {
  data: PhishingType[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Nettoyer le contenu existant
    d3.select(chartRef.current).selectAll("*").remove();

    // Dimensions et marges
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    // Créer le SVG
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    // Calculer les valeurs totales pour les pourcentages
    const total = data.reduce((sum, d) => sum + d.count, 0);

    // Créer un générateur de pie
    const pie = d3.pie<PhishingType>()
      .value(d => d.count)
      .sort(null);

    // Créer un générateur d'arc
    const arc = d3.arc<d3.PieArcDatum<PhishingType>>()
      .innerRadius(0)
      .outerRadius(radius * 0.8);

    // Créer un arc plus grand pour les étiquettes
    const outerArc = d3.arc<d3.PieArcDatum<PhishingType>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Créer un arc pour l'animation
    const arcTween = function(this: SVGPathElement, d: d3.PieArcDatum<PhishingType>) {
      const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function(t: number) { return arc(i(t)) || ""; };
    };

    // Ajouter les tranches du pie
    const path = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("fill", d => d.data.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("opacity", 0.8)
      .transition()
      .duration(1000)
      .attrTween("d", arcTween as any);

    // Ajouter des lignes pour les étiquettes
    const polyline = svg.selectAll(".label-line")
      .data(pie(data))
      .enter()
      .append("polyline")
      .attr("class", "label-line")
      .attr("points", function(d: d3.PieArcDatum<PhishingType>) {
        const pos = outerArc.centroid(d);
        const posLabel = outerArc.centroid(d);
        posLabel[0] = radius * (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), posLabel].join(" ");
      })
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("opacity", 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

    // Ajouter les étiquettes avec pourcentages
    const label = svg.selectAll(".label-text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("class", "label-text")
      .attr("dy", ".35em")
      .html(function(d: d3.PieArcDatum<PhishingType>) {
        const percent = Math.round((d.data.count / total) * 100);
        return `${d.data.type}<tspan x="0" dy="1.2em">(${percent}%)</tspan>`;
      })
      .attr("transform", function(d: d3.PieArcDatum<PhishingType>) {
        const pos = outerArc.centroid(d);
        pos[0] = radius * (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1.1 : -1.1);
        return `translate(${pos})`;
      })
      .style("text-anchor", function(d: d3.PieArcDatum<PhishingType>) {
        return (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI) ? "start" : "end";
      })
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .style("opacity", 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

    // Ajouter le titre au centre
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .attr("fill", "#fff")
      .style("font-size", "16px")
      .text("Types de phishing");

    // Ajouter le nombre total au centre
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .style("opacity", 0)
      .text(`Total: ${total.toLocaleString()}`)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

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

    // Ajouter l'interactivité
    svg.selectAll(".arc")
      .data(pie(data))
      .on("mouseover", (event, d) => {
        const percent = Math.round((d.data.count / total) * 100);
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.data.type}</strong><br/>Attaques: ${d.data.count.toLocaleString()}<br/>Pourcentage: ${percent}%`);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("transform", function() {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.05}, ${centroid[1] * 0.05})`;
          });
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", (event) => {
        tooltip.style("visibility", "hidden");
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .attr("transform", "translate(0, 0)");
      });

  }, [data]);

  return (
    <div className="w-full bg-slate-900 rounded-lg p-4">
      <div ref={chartRef} className="w-full h-[300px]"></div>
    </div>
  );
};

export default PieChart;
