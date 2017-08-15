import { Building1Page } from './app.po';

describe('building1 App', () => {
  let page: Building1Page;

  beforeEach(() => {
    page = new Building1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
