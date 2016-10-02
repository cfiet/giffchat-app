import { GiffchatAppPage } from './app.po';

describe('giffchat-app App', function() {
  let page: GiffchatAppPage;

  beforeEach(() => {
    page = new GiffchatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
