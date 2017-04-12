export interface City {
  _id?: string;
  alias: string;
  name: string;
  icon: string;
  zoom: string;
  flags: Flags;
  pos: number[];
}

export interface Flags {
  includeInDistance: boolean;
  hasHomePage: boolean;
  hasAttractionsPage: boolean;
  hasAttractionsListPage: boolean;
  hasBuildingPage: boolean;
  hasPhotoPage: boolean;
  hasMapPage: boolean;
  hasFactsPage: boolean;
  hasToursPage: boolean;
  hasPostersPage: boolean;
}

export interface Slide {
  slide: string;
}
