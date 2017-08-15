import { Building2Page } from './app.po';

describe('building2 App', () => {
  let page: Building2Page;

  beforeEach(() => {
    page = new Building2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
