import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import ScriptEditorWebPart from '../ScriptEditorWebPart';

describe('ScriptEditorWebPart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the web part', () => {
    const component = <ScriptEditorWebPart />;
    ReactDom.render(component, container);

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('displays the script when in read mode', () => {
    const component = <ScriptEditorWebPart properties={{ script: '<div>Test script</div>', displayMode: DisplayMode.Read }} />;
    ReactDom.render(component, container);

    expect(container.innerHTML).toContain('<div>Test script</div>');
  });

  it('displays the script editor when in edit mode', () => {
    const component = <ScriptEditorWebPart properties={{ script: '<div>Test script</div>', displayMode: DisplayMode.Edit }} />;
    ReactDom.render(component, container);

    expect(container.innerHTML).toContain('Edit HTML Code');
  });
});
