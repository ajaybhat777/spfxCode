import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ScriptEditorWebPart from './ScriptEditorWebPart';

// Mock the SPComponentLoader module
jest.mock('@microsoft/sp-loader', () => ({
  SPComponentLoader: {
    loadScript: jest.fn(),
  },
}));

// Mock the ReactDom.render function
jest.mock('react-dom', () => ({
  render: jest.fn(),
  unmountComponentAtNode: jest.fn(),
}));

// Define some mock web part properties
const mockWebPartProps = {
  script: 'console.log("Hello, world!");',
  title: 'My Script Editor',
  removePadding: true,
};

// Define some mock web part context values
const mockContext = {
  instanceId: '12345678-1234-1234-1234-1234567890ab',
  propertyPane: {
    refresh: jest.fn(),
  },
};

// Define some helper functions for creating instances of the ScriptEditorWebPart class
const createWebPart = (props: any = {}, context: any = {}) => {
  return new ScriptEditorWebPart({
    displayMode: DisplayMode.Edit,
    title: 'Test Web Part',
    updateProperty: jest.fn(),
    ...props,
  }, {
    ...mockContext,
    ...context,
  });
};

describe('ScriptEditorWebPart', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render the editor pane in Edit mode', async () => {
      const webPart = createWebPart(mockWebPartProps);

      await webPart.render();

      expect(ReactDom.render).toHaveBeenCalled();
      expect(ReactDom.render.mock.calls[0][0].type.name).toBe('ScriptEditor');
    });

    it('should unmount the editor pane and render the script in Read mode', async () => {
      const webPart = createWebPart({
        ...mockWebPartProps,
        displayMode: DisplayMode.Read,
      });

      webPart.domElement.innerHTML = '<div>Test Script</div>';

      await webPart.render();

      expect(ReactDom.unmountComponentAtNode).toHaveBeenCalledWith(webPart.domElement);
      expect(webPart.domElement.innerHTML).toBe(mockWebPartProps.script);
    });

    it('should remove padding from parent elements in Read mode when removePadding is true', async () => {
      const webPart = createWebPart({
        ...mockWebPartProps,
        displayMode: DisplayMode.Read,
      });

      // Mock the parent element to have padding
      const parentElement = document.createElement('div');
      parentElement.style.paddingTop = '10px';
      parentElement.style.paddingBottom = '10px';
      webPart.domElement.parentElement = parentElement;

      await webPart.render();

      // Check that the padding was removed from the parent element
      expect(parentElement.style.paddingTop).toBe('0px');
      expect(parentElement.style.paddingBottom).toBe('0px');
    });

    it('should not remove padding from parent elements in Read mode when removePadding is false', async () => {
      const webPart = createWebPart({
        ...mockWebPartProps,
        displayMode: DisplayMode.Read,
        removePadding: false,
      });

      // Mock the parent element to have padding
      const parentElement = document.createElement('
