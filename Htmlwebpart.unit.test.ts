import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, IPropertyPaneField } from "@microsoft/sp-property-pane";
import { IScriptEditorWebPartProps } from './IScriptEditorWebPartProps';
import ScriptEditorWebPart from './ScriptEditorWebPart';
import PropertyPaneLogo from './PropertyPaneLogo';

// Mocked SPComponentLoader
jest.mock('@microsoft/sp-loader', () => ({
  SPComponentLoader: {
    loadScript: jest.fn(),
  },
}));

// Mock BaseClientSideWebPart
class MockBaseClientSideWebPart<P> extends BaseClientSideWebPart<P> {
  protected onInit(): Promise<void> {
    return Promise.resolve();
  }
}

describe('ScriptEditorWebPart', () => {
  let webPart: ScriptEditorWebPart;
  let webPartElem: HTMLElement;
  const renderEditorSpy = jest.spyOn(ScriptEditorWebPart.prototype, 'renderEditor');

  beforeEach(() => {
    // Mock the web part properties
    const properties: IScriptEditorWebPartProps = {
      script: '',
      title: '',
      removePadding: false,
    };

    // Create a new instance of the web part
    webPart = new ScriptEditorWebPart();
    webPart.displayMode = DisplayMode.Read;
    webPart.properties = properties;
    webPart.render();
    
    // Mock the context
    const context = {
      instanceId: 'instanceId',
      pageContext: {
        web: {
          absoluteUrl: '',
        },
      },
      webPartProperties: properties,
      webPartDisplayMode: DisplayMode.Read,
      webPartContext: {
        serviceScope: {
          consume: jest.fn(),
        },
      } as any,
      propertyPane: {
        refresh: jest.fn(),
      } as any,
    };
    
    webPart.context = context;

    // Create a new DOM element to render the web part
    webPartElem = document.createElement('div');
    document.body.appendChild(webPartElem);
    webPart.render();

    // Reset the spy on renderEditor
    renderEditorSpy.mockClear();
  });

  afterEach(() => {
    ReactDom.unmountComponentAtNode(webPartElem);
    document.body.removeChild(webPartElem);
  });

  it('renders in read mode', () => {
    expect(renderEditorSpy).not.toHaveBeenCalled();
    expect(webPartElem.innerHTML).toContain('');
  });

  it('renders in edit mode', async () => {
    webPart.displayMode = DisplayMode.Edit;
    webPart.render();

    expect(renderEditorSpy).toHaveBeenCalled();
  });
});
