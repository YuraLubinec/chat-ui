import { ChatUiPage } from './app.po';

describe('chat-ui App', () => {
  let page: ChatUiPage;

  beforeEach(() => {
    page = new ChatUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
