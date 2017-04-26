export interface Article {
  alias: string;
  title: string;
  subTitle?: string;
  cityName: string;
  preview?: string;
  thumb?: string;
  hasPos?: boolean;
  photoCount?: number;
  photoCountRelated?: number;
}
