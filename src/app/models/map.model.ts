export interface Address {
  nl: string;
  en: string;
}

export interface Marker {
  lat: number;
  lon: number;
  label?: string;
  icon?: string;
  url?: string;
  isOpen: boolean;
  infoTxt: string;
  infoImg?: string;
  address?: string[];
}

export interface Map {
  lat: number;
  lon: number;
  zoom: number;
}

