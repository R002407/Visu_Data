
// Type declarations for missing D3 functions

// Augmentations pour d3
declare namespace d3 {
  // Pour la fonction interval
  export function interval(callback: (...args: any[]) => void, delay?: number): Timer;
  
  // Pour le type Timer
  export interface Timer {
    stop(): void;
    restart(callback: (...args: any[]) => void, delay?: number, time?: number): Timer;
  }
  
  // Pour les fonctions de projection géographique
  export namespace geo {
    export function orthographic(): GeoProjection;
  }
  
  // Pour le type GeoProjection
  export interface GeoProjection {
    scale(scale?: number): GeoProjection | number;
    translate(translate?: [number, number]): GeoProjection | [number, number];
    rotate(rotation?: [number, number, number?]): GeoProjection | [number, number, number?];
    precision(precision?: number): GeoProjection | number;
    clipAngle(angle?: number): GeoProjection | number;
    fitSize(size: [number, number], object: any): GeoProjection;
    fitExtent(extent: [[number, number], [number, number]], object: any): GeoProjection;
    (coordinates: [number, number]): [number, number] | null;
  }
}
