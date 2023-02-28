import * as React from 'react';
import { IWebPartContext, IWebPartContextualMenuItem } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { IScriptEditorWebPartProps } from './IScriptEditorWebPartProps';
import ScriptEditorWebPart from './ScriptEditorWebPart';

describe('ScriptEditorWebPart', () => {
  let mockWebPartContext: IWebPartContext;
  let mockSettings: IScriptEditorWebPartProps;
  let component: ScriptEditorWebPart;

  beforeEach(() => {
    mockWebPartContext = {
      instanceId: 'mockInstanceId',
      pageContext: {
        web: {
          absoluteUrl: 'https://mock.sharepoint.com',
        },
      },
      serviceScope: null,
      webPartContext: null,
      webPartManager: null,
      domElement: null,
      properties: {},
      displayMode: DisplayMode.Read,
      version: null,
      contextualMenuItems: [],
      setLayoutMode: jest.fn(),
      notifyPropertyChanged: jest.fn(),
      configureStart: jest.fn(),
      onContextMenu: jest.fn(),
      onDispose: jest.fn(),
      onInit: jest.fn(),
      onLoad: jest.fn(),
      onResize: jest.fn(),
      onUpdate: jest.fn(),
      onWebPartClosed: jest.fn(),
      onWebPartDeleted: jest.fn(),
      onWebPartMoved: jest.fn(),
      onWebPartRendered: jest.fn(),
    };

    mockSettings = {
      script: 'console.log("Hello, World!");',
      title: 'Mock Script Editor',
      removePadding: true,
    };

    component = new ScriptEditorWebPart();
    component.context = mockWebPartContext;
    component.properties = mockSettings;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders in read mode', () => {
    // Arrange
    component.displayMode = DisplayMode.Read;

    // Act
    component.render();

    // Assert
    expect(component.domElement.innerHTML).toBe(mockSettings.script);
  });

  it('renders in edit mode', async () => {
    // Arrange
    component.displayMode = DisplayMode.Edit;
    SPComponentLoader.loadComponentById = jest.fn().mockResolvedValueOnce(() => {
      return {
        default: jest.fn(() => {
          return <div>Mock Script Editor</div>;
        }),
      };
    });

    // Act
    await component.renderEditor();

    // Assert
    expect(SPComponentLoader.loadComponentById).toHaveBeenCalledTimes(1);
    expect(component.domElement.innerHTML).toBe('<div>Mock Script Editor</div>');
  });

  it('removes padding in read mode when removePadding property is true', () => {
    // Arrange
    component.displayMode = DisplayMode.Read;
    component.properties.removePadding = true;
    const parentElement = document.createElement('div');
    parentElement.style.paddingTop = '10px';
    component.domElement.parentElement = parentElement;

    // Act
    component.render();

    // Assert
    expect(component.domElement.parentElement.style.paddingTop).toBe('0px');
  });

  it('does not remove padding in read mode when removePadding property is false', () => {
    // Arrange
    component.displayMode = DisplayMode.Read;
    component.properties.removePadding = false;
    const parentElement = document.createElement('div');
    parentElement.style.paddingTop = '10px';
    component.domElement.parentElement = parentElement;

    // Act
    component.render();

    // Assert
    expect(component.dom
