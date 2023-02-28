import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import PropertyPaneLogo from './PropertyPaneLogo';

// Mocks
jest.mock('@microsoft/sp-core-library', () => ({
  DisplayMode: { Read: 1 }
}));

jest.mock('@microsoft/sp-webpart-base', () => ({
  BaseClientSideWebPart: jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    dataVersion: { toString: () => '1.0' },
    context: { instanceId: '1' }
  }))
}));

jest.mock('@microsoft/sp-property-pane', () => ({
  PropertyPaneToggle: jest.fn().mockImplementation(() => ({
    render: jest.fn()
  })),
  IPropertyPaneConfiguration: jest.fn().mockImplementation(() => ({
    pages: [
      {
        groups: [
          {
            groupFields: [{}]
          }
        ]
      }
    ]
  }))
}));

jest.mock('./components/ScriptEditor', () => ({
  default: jest.fn().mockImplementation(() => <div />)
}));

describe('ScriptEditorWebPart', () => {
  let reactDomSpy;
  let webPart: BaseClientSideWebPart<any>;
  let scriptEditorWebPart: any;

  beforeEach(() => {
    reactDomSpy = jest.spyOn(ReactDom, 'render');
    webPart = new BaseClientSideWebPart<any>();
    scriptEditorWebPart = new (require('./ScriptEditorWebPart').default)(webPart);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render in display mode', () => {
    // Arrange
    scriptEditorWebPart.displayMode = DisplayMode.Read;
    scriptEditorWebPart.properties = {
      removePadding: false,
      script: '<h1>Hello World!</h1>',
      title: 'Test Web Part'
    };

    // Act
    scriptEditorWebPart.render();

    // Assert
    expect(reactDomSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(HTMLElement)
    );
  });

  it('should render in edit mode', async () => {
    // Arrange
    scriptEditorWebPart.displayMode = DisplayMode.Edit;
    scriptEditorWebPart.properties = {
      removePadding: false,
      script: '<h1>Hello World!</h1>',
      title: 'Test Web Part'
    };

    // Act
    await scriptEditorWebPart.render();

    // Assert
    expect(reactDomSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(HTMLElement)
    );
  });

  it('should remove padding in read mode when removePadding is true', async () => {
    // Arrange
    scriptEditorWebPart.displayMode = DisplayMode.Read;
    scriptEditorWebPart.properties = {
      removePadding: true,
      script: '<h1>Hello World!</h1>',
      title: 'Test Web Part'
    };

    const parentNode = { style: {} };
    const grandParentNode = { style: {} };
    const greatGrandParentNode = { style: {} };
    const greatGreatGrandParentNode = { style: {} };
    const greatGreatGreatGrandParentNode = { style: {} };
    scriptEditorWebPart.domElement = {
     
