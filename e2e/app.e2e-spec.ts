import { StadsverkennerPage } from './app.po';

describe('stadsverkenner App', () => {
  let page: StadsverkennerPage;

  beforeEach(() => {
    page = new StadsverkennerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
