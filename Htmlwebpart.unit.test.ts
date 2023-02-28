import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneField } from '@microsoft/sp-property-pane';
import PropertyPaneLogo from './PropertyPaneLogo';
import ScriptEditorWebPart from './ScriptEditorWebPart';
import ScriptEditor from './components/ScriptEditor';

jest.mock('react');
jest.mock('react-dom');
jest.mock('@microsoft/sp-core-library');
jest.mock('@microsoft/sp-loader');
jest.mock('@microsoft/sp-webpart-base');
jest.mock('@microsoft/sp-property-pane');
jest.mock('./PropertyPaneLogo');
jest.mock('./components/ScriptEditor');

describe('ScriptEditorWebPart', () => {
  let scriptEditorWebPart: ScriptEditorWebPart;
  let context: any;

  beforeEach(() => {
    context = {
      instanceId: 'instanceId',
      propertyPane: {
        register: jest.fn(),
        refresh: jest.fn(),
      },
    };
    scriptEditorWebPart = new ScriptEditorWebPart();
    scriptEditorWebPart.displayMode = DisplayMode.Read;
    scriptEditorWebPart.domElement = document.createElement('div');
    scriptEditorWebPart.context = context;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render editor when displayMode is Edit', async () => {
      scriptEditorWebPart.displayMode = DisplayMode.Edit;
      await scriptEditorWebPart.render();
      expect(ReactDOM.render).toHaveBeenCalledTimes(1);
      expect(ReactDOM.render).toHaveBeenCalledWith(
        expect.any(Object),
        scriptEditorWebPart.domElement
      );
    });

    it('should render script when displayMode is Read', () => {
      scriptEditorWebPart.properties = {
        script: '<div>Script Content</div>',
        removePadding: false,
        title: 'Script Editor Web Part',
      };
      scriptEditorWebPart.render();
      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledTimes(1);
      expect(scriptEditorWebPart.domElement.innerHTML).toBe(
        scriptEditorWebPart.properties.script
      );
    });

    it('should remove padding from parent element when removePadding is true', () => {
      const parentElement = document.createElement('div');
      const childElement = document.createElement('div');
      parentElement.appendChild(childElement);
      scriptEditorWebPart.domElement = parentElement;
      scriptEditorWebPart.properties = {
        script: '<div>Script Content</div>',
        removePadding: true,
        title: 'Script Editor Web Part',
      };
      scriptEditorWebPart.render();
      expect(parentElement.style.paddingTop).toBe('0px');
      expect(parentElement.style.paddingBottom).toBe('0px');
      expect(parentElement.style.marginTop).toBe('0px');
      expect(parentElement.style.marginBottom).toBe('0px');
    });
  });
});
