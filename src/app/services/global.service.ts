export class GlobalService {
  private _imageHost = 'http://www.aviewoncities.com';
  private _siteTitle = 'Stadsverkenner';

  get imageHost() {
    return this._imageHost;
  }

  get title() {
    return this._siteTitle;
  }
}
