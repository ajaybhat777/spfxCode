import * as React from 'react';
import * as ReactDom from 'react-dom';
import ScriptEditorWebPart from './ScriptEditorWebPart';

describe('ScriptEditorWebPart', () => {
  beforeEach(() => {
    jest.spyOn(ReactDom, 'render').mockImplementation(() => null);
    jest.spyOn(ReactDom, 'unmountComponentAtNode').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders editor component', async () => {
    const mockContext = {
      instanceId: '123',
      propertyPane: {},
      sdks: { microsoftTeams: false },
    };
    const mockProps = {
      script: '<div>Hello, world!</div>',
      title: 'My web part',
      removePadding: true,
      spPageContextInfo: false,
      teamsContext: false,
    };
    const element = React.createElement(ScriptEditorWebPart, {
      context: mockContext,
      ...mockProps,
    });

    await ReactDom.render(element, document.createElement('div'));

    expect(ReactDom.render).toHaveBeenCalledTimes(1);
    expect(ReactDom.render).toHaveBeenCalledWith(
      expect.any(React.ReactElement),
      expect.any(HTMLElement)
    );
  });

  it('renders read mode', () => {
    const mockContext = {
      instanceId: '123',
      propertyPane: {},
      sdks: { microsoftTeams: false },
    };
    const mockProps = {
      script: '<div>Hello, world!</div>',
      title: 'My web part',
      removePadding: true,
      spPageContextInfo: false,
      teamsContext: false,
    };
    const element = React.createElement(ScriptEditorWebPart, {
      context: mockContext,
      ...mockProps,
      displayMode: { Read: 1 },
    });

    ReactDom.render(element, document.createElement('div'));

    expect(ReactDom.unmountComponentAtNode).toHaveBeenCalledTimes(1);
    expect(ReactDom.unmountComponentAtNode).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('updates script property', async () => {
    const mockContext = {
      instanceId: '123',
      propertyPane: {},
      sdks: { microsoftTeams: false },
    };
    const mockProps = {
      script: '<div>Hello, world!</div>',
      title: 'My web part',
      removePadding: true,
      spPageContextInfo: false,
      teamsContext: false,
    };
    const element = React.createElement(ScriptEditorWebPart, {
      context: mockContext,
      ...mockProps,
    });
    const instance = await ReactDom.render(element, document.createElement('div'));
    const newScript = '<div>Goodbye, world!</div>';

    instance.scriptUpdate('script', mockProps.script, newScript);

    expect(instance.properties.script).toBe(newScript);
    expect(instance._propertyPaneHelper.initialValue).toBe(newScript);
  });
});
