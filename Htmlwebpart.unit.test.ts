import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ScriptEditorWebPart from './ScriptEditorWebPart';

// Mock the SPComponentLoader and SPPropertyPane modules
jest.mock('@microsoft/sp-component-base', () => ({
  ...jest.requireActual('@microsoft/sp-component-base'),
  SPComponentLoader: {
    loadScript: jest.fn(),
    loadCss: jest.fn(),
  },
}));
jest.mock('@microsoft/sp-property-pane', () => ({
  ...jest.requireActual('@microsoft/sp-property-pane'),
}));

describe('ScriptEditorWebPart', () => {
  let component: ScriptEditorWebPart;

  beforeEach(() => {
    component = new ScriptEditorWebPart();
  });

  it('should render the editor', async () => {
    // Mock the ReactDom.render method
    ReactDom.render = jest.fn();

    // Set the properties of the component
    component.properties = {
      script: 'console.log("Hello, World!");',
      title: 'Script Editor',
      removePadding: true,
    };
    component.displayMode = 1;

    // Call the render method
    component.render();

    // Expect that the ReactDom.render method was called with the correct parameters
    expect(ReactDom.render).toHaveBeenCalledWith(
      expect.anything(),
      component.domElement,
    );
  });

  it('should update the script property', () => {
    // Set the properties of the component
    component.properties = {
      script: 'console.log("Hello, World!");',
      title: 'Script Editor',
      removePadding: true,
    };

    // Call the scriptUpdate method
    component.scriptUpdate('script', 'console.log("Hello, World!");', 'console.log("Hello, Jest!");');

    // Expect that the script property was updated
    expect(component.properties.script).toBe('console.log("Hello, Jest!");');
  });
});
