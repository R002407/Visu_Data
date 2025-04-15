
// Déclaration pour le module globe.gl
declare module 'globe.gl' {
  export default function Globe(): any;
}

// Déclaration pour d3-geo
declare module 'd3-geo' {
  export function geoOrthographic(): any;
  export function geoPath(): any;
}

// Déclaration pour topojson-client
declare module 'topojson-client' {
  export function feature(topology: any, object: any): any;
}
