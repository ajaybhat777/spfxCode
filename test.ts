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
    const spyRender = jest.spyOn(ScriptEditorWebPart.prototype, 'render');
    const mockProps = {
    displayMode: DisplayMode.Read,
    removePadding: true,
    script: '<div id="test">Test script</div>',
    title: 'Test title'
    };
    const webPart = new ScriptEditorWebPart();
    webPart.render();
    webPart.properties = mockProps;
    // Act
    webPart.render();

    // Assert
    const element = container.querySelector('#test');
    expect(spyUnmount).toHaveBeenCalledTimes(1);
    expect(spyRender).toHaveBeenCalledTimes(2);
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('Test script');
    expect(element.tagName).toBe('DIV');
    expect(container.style.paddingTop).toBe('0px');
    expect(container.style.paddingBottom).toBe('0px');
    expect(container.style.marginTop).toBe('0px');
    expect(container.style.marginBottom).toBe('0px');
    });



