import { Building3Page } from './app.po';

describe('building3 App', () => {
  let page: Building3Page;

  beforeEach(() => {
    page = new Building3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
