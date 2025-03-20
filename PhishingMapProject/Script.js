// Définition des dimensions
const width = 960, height = 500;

// Création de l'élément SVG
const svg = d3.select("#map-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Projection géographique
const projection = d3.geoNaturalEarth1()
    .scale(150)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Chargement de la carte du monde
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(worldData => {
    const countries = topojson.feature(worldData, worldData.objects.countries);

    svg.selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#dcdcdc")
        .attr("stroke", "#333");

    // Chargement des données de phishing
    d3.csv("data.csv").then(data => {
        // Convertir les années en nombre
        data.forEach(d => d.year = +d.year);

        // Affichage initial
        updateMap(2020);

        // Ajout du slider interactif
        d3.select("#yearSlider").on("input", function() {
            let year = this.value;
            d3.select("#selectedYear").text(year);
            updateMap(year);
        });

        function updateMap(year) {
            const filteredData = data.filter(d => d.year == year);

            // Supprimer les anciens points
            svg.selectAll(".attack-point").remove();

            // Ajouter les nouveaux points
            svg.selectAll(".attack-point")
                .data(filteredData)
                .enter().append("circle")
                .attr("class", "attack-point")
                .attr("cx", d => projection([+d.longitude, +d.latitude])[0])
                .attr("cy", d => projection([+d.longitude, +d.latitude])[1])
                .attr("r", 4)
                .attr("fill", "red")
                .attr("opacity", 0.7)
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("r", 8);
                    alert(`Attaques: ${d.attacks}\nLieu: ${d.city}, ${d.country}`);
                })
                .on("mouseout", function() {
                    d3.select(this).attr("r", 4);
                });
        }
    });
});
