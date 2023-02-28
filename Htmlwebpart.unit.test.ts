import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import ScriptEditorWebPart from './ScriptEditorWebPart';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('ScriptEditorWebPart', () => {
  let domElement: HTMLElement;
  let webPart: ScriptEditorWebPart;

  beforeEach(() => {
    domElement = document.createElement('div');

    const renderSpy = jest.spyOn(ReactDom, 'render');
    webPart = new ScriptEditorWebPart();
    webPart.render();
    expect(renderSpy).toHaveBeenCalledWith(expect.any(Object), domElement);
    renderSpy.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render editor component', async () => {
    const editorMock = jest.fn().mockReturnValue(<div>Editor Component</div>);
    jest.mock('./components/ScriptEditor', () => ({ default: editorMock }));

    // Set the display mode to Edit
    webPart.displayMode = 2;
    await webPart.renderEditor();

    expect(ReactDom.render).toHaveBeenCalledWith(expect.any(Object), domElement);

    // Verify that the editor component was rendered with the correct props
    const expectedProps = {
      script: webPart.properties.script,
      title: webPart.properties.title,
      propPaneHandle: webPart.context.propertyPane,
      key: expect.any(String)
    };
    expect(editorMock).toHaveBeenCalledWith(expectedProps, expect.any(Object));
  });

  it('should render script content when in Read mode', async () => {
    // Set the display mode to Read
    webPart.displayMode = 1;
    webPart.properties.script = '<div>Hello World!</div>';
    webPart.render();

    expect(ReactDom.render).not.toHaveBeenCalled();

    // Verify that the script content was rendered to the DOM
    expect(domElement.innerHTML).toEqual(webPart.properties.script);
  });

  it('should remove padding from the parent element when in Read mode', async () => {
    // Set the display mode to Read
    webPart.displayMode = 1;
    webPart.properties.removePadding = true;
    webPart.render();

    expect(ReactDom.render).not.toHaveBeenCalled();

    // Verify that padding was removed from the parent element
    expect(webPart.domElement.parentElement.style.paddingTop).toBe('0px');
    expect(webPart.domElement.parentElement.style.paddingBottom).toBe('0px');
    expect(webPart.domElement.parentElement.style.marginTop).toBe('0px');
    expect(webPart.domElement.parentElement.style.marginBottom).toBe('0px');
  });

  it('should render the property pane configuration', () => {
    const expectedConfiguration: IPropertyPaneConfiguration = {
      pages: [
        {
          groups: [
            {
              groupFields: expect.any(Array)
            }
          ]
        }
      ]
    };

    const actualConfiguration = webPart.getPropertyPaneConfiguration();
    expect(actualConfiguration).toEqual(expectedConfiguration);
  });
});
