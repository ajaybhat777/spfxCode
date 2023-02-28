import * as React from 'react';
import ScriptEditorWebPart from './ScriptEditorWebPart';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { IScriptEditorProps } from './components/IScriptEditorProps';
import PropertyPaneLogo from './PropertyPaneLogo';

jest.mock('@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor', () => {
  return {
    PropertyFieldCodeEditor: jest.fn()
  };
});

jest.mock('react-dom', () => ({
  render: jest.fn(),
  unmountComponentAtNode: jest.fn()
}));

describe('ScriptEditorWebPart', () => {
  let webPart: ScriptEditorWebPart;
  let mockElement: HTMLElement;
  let mockPropertyPaneHelper: any;
  const mockPropPane = {
    refresh: jest.fn(),
    getPropertyPaneConfiguration: jest.fn()
  };

  beforeEach(() => {
    webPart = new ScriptEditorWebPart();
    webPart.context = {
      instanceId: 'instanceId',
      propertyPane: mockPropPane,
      sdks: {}
    };
    webPart.properties = {
      title: 'test title',
      removePadding: false,
      script: 'test script',
      spPageContextInfo: false,
      teamsContext: false
    };
    mockPropertyPaneHelper = {
      initialValue: webPart.properties.script,
      onPropertyChange: jest.fn()
    };
    webPart['_propertyPaneHelper'] = mockPropertyPaneHelper;
    mockElement = document.createElement('div');
    jest.spyOn(webPart, 'executeScript').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set scriptUpdate method as binded', () => {
      expect(webPart.scriptUpdate.name).toEqual('bound scriptUpdate');
    });
  });

  describe('render', () => {
    it('should call renderEditor if display mode is Edit', async () => {
      webPart.displayMode = DisplayMode.Edit;
      jest.spyOn(webPart, 'renderEditor').mockImplementation(jest.fn());
      await webPart.render();
      expect(webPart.renderEditor).toHaveBeenCalledTimes(1);
    });

    it('should call executeScript if display mode is Read', () => {
      webPart.displayMode = DisplayMode.Read;
      jest.spyOn(webPart, 'executeScript').mockImplementation(jest.fn());
      webPart.render();
      expect(webPart.executeScript).toHaveBeenCalledTimes(1);
    });

    it('should remove padding from parent element if removePadding is true', () => {
      webPart.displayMode = DisplayMode.Read;
      webPart.properties.removePadding = true;
      const mockParentElement = {
        style: {
          paddingTop: '10px',
          paddingBottom: '10px',
          marginTop: '10px',
          marginBottom: '10px'
        }
      };
      const spyGetComputedStyle = jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
        paddingTop: '10px'
      }));
      const spyGetParentElement = jest.spyOn(webPart.domElement, 'parentElement', 'get').mockImplementation(() => mockParentElement as any);
      webPart.render();
      expect(mockParentElement.style.paddingTop).toEqual('0px');
      expect(mockParentElement.style.paddingBottom).toEqual('0px');
      expect(mockParentElement.style.marginTop).toEqual('0px');
