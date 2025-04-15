
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PhishingAttack } from '@/types';

interface GlobeVisualizationProps {
  data: PhishingAttack[];
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ data }) => {
  const globeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeEl.current) return;
    
    const width = globeEl.current.clientWidth;
    const height = 500;
    
    // Nettoyer le contenu existant
    d3.select(globeEl.current).selectAll("*").remove();
    
    // Créer une projection de la carte
    const projection = d3.geoOrthographic()
      .scale(220)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.1);
    
    // Créer la carte
    const svg = d3.select(globeEl.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "#0A192F"); // Un bleu profond pour le fond de l'espace
      
    // Gradient pour la planète pour lui donner plus de profondeur
    const defs = svg.append("defs");
    const planetGradient = defs.append("radialGradient")
      .attr("id", "planetGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    
    planetGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1A2C4F"); // Bleu profond au centre
    
    planetGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0E1B33"); // Bleu très sombre sur les bords
      
    // Cercle de base pour la planète avec le gradient
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .attr("fill", "url(#planetGradient)")
      .attr("stroke", "#3A4766")  // Contour gris-bleu subtil
      .attr("stroke-width", 1.5);
      
    // Ajouter des étoiles avec un effet de scintillement
    const stars = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    svg.selectAll(".star")
      .data(stars)
      .join("circle")
      .attr("class", "star")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", "white")
      .attr("opacity", d => d.opacity)
      .style("animation", "twinkle 3s infinite alternate");
    
    // Points de phishing avec un gradient et un effect subtil
    const circles = svg.selectAll(".phishing-point")
      .data(data)
      .join("circle")
      .attr("class", "phishing-point")
      .attr("transform", d => {
        const coords = projection([d.longitude, d.latitude]);
        return coords ? `translate(${coords[0]}, ${coords[1]})` : "";
      })
      .attr("r", d => Math.log(d.count) / 2)
      .attr("fill", d => {
        const color = d3.interpolateInferno(Math.log(d.count) / Math.log(12000));
        return `url(#pointGradient-${d.id})`;
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.8);
    
    // Gradient pour les points de phishing
    const pointGradients = defs.selectAll(".point-gradient")
      .data(data)
      .enter()
      .append("radialGradient")
      .attr("id", d => `pointGradient-${d.id}`)
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    
    pointGradients.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d => d3.interpolateInferno(Math.log(d.count) / Math.log(12000)))
      .attr("stop-opacity", 0.8);
    
    pointGradients.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", d => d3.interpolateInferno(Math.log(d.count) / Math.log(12000)))
      .attr("stop-opacity", 0.3);
    
    // Tooltip
    const tooltip = d3.select(globeEl.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(30, 40, 60, 0.9)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "100");
    
    // Interactions tooltips
    circles
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`
            <strong>${d.city}, ${d.country}</strong><br/>
            Attaques: ${d.count.toLocaleString()}<br/>
            Type: ${d.type}
          `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
    
    // Rotation de la planète
    let rotateTimer;
    function rotate() {
      const currentRotate = projection.rotate();
      projection.rotate([currentRotate[0] + 0.3, currentRotate[1]]);
      
      circles.attr("transform", d => {
        const coords = projection([d.longitude, d.latitude]);
        return coords ? `translate(${coords[0]}, ${coords[1]})` : "";
      });
    }
    
    rotateTimer = d3.interval(rotate, 50);
    
    return () => {
      if (rotateTimer) rotateTimer.stop();
    };
  }, [data]);

  return (
    <div className="relative w-full bg-slate-900 rounded-lg overflow-hidden">
      <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
        Survolez les points pour voir les détails
      </div>
      <div ref={globeEl} className="w-full h-[500px]" />
    </div>
  );
};

export default GlobeVisualization;

