export interface City {
  _id?: string;
  alias: string;
  name: string;
  icon?: string;
  flags: Flags;
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
