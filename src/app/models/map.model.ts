export interface Marker {
  lat: number;
  lon: number;
  label?: string;
  icon?: string;
  url?: string;
  infotxt: string;
}

export interface Map {
  lat: number;
  lon: number;
  zoom: number;
}

