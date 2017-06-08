export interface Article {
  alias: string;
  title: string;
  subTitle?: string;
  cityName: string;
  cityAlias?: string;
  preview?: string;
  legacyId?: string;
  thumb?: string;
  hasPos?: boolean;
  photoCount?: number;
  photoCountRelated?: number;
  nrOfActivities: number;
}
