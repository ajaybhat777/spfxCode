import * as React from 'react';
import { render } from '@testing-library/react';
import ScriptEditorWebPart from './ScriptEditorWebPart';

test('renders script editor web part', () => {
  const props = {
    script: '<div>Hello world</div>',
    title: 'Test Title',
    removePadding: true,
    spPageContextInfo: false,
    teamsContext: false
  };
  const { container } = render(<ScriptEditorWebPart {...props} />);
  expect(container.innerHTML).toContain(props.script);
});
