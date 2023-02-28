// Define a mock implementation of the BaseClientSideWebPart class
class MockBaseClientSideWebPart<P extends { [key: string]: any } = {}> extends BaseClientSideWebPart<P> {
  private _properties: P;
  public set properties(props: P) {
    this._properties = props;
  }
  public get properties(): P {
    return this._properties;
  }
}

// Define a mock implementation of the IWebPartContext interface
const mockContext: any = {
  instanceId: '1234',
  propertyPane: {
    refresh: jest.fn(),
  },
};
  
  // Define the test suite
describe('ScriptEditorWebPart', () => {
  let container: HTMLElement;
  let webPart: MockBaseClientSideWebPart<IScriptEditorWebPartProps>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    webPart = new MockBaseClientSideWebPart<IScriptEditorWebPartProps>();
    webPart.displayMode = DisplayMode.Read;
    webPart.context = mockContext;
    webPart.properties = {
      title: 'Test Title',
      script: 'console.log("Hello, world!");',
      removePadding: true,
    };
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });
  
  it('renders the script in read mode', () => {
    // Arrange
    const spyUnmount = jest.spyOn(ReactDOM, 'unmountComponentAtNode');
    const spyRender = jest.spyOn
