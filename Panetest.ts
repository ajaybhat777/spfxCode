const mockPropertyPaneConfiguration: IPropertyPaneConfiguration = {
  pages: [
    {
      header: {
        description: 'Mock Property Pane Page'
      },
      groups: [
        {
          groupName: 'Mock Group',
          groupFields: [
            {
              type: PropertyPaneFieldType.Text,
              label: 'Text Field 1',
              key: 'textField1'
            },
            {
              type: PropertyPaneFieldType.Text,
              label: 'Text Field 2',
              key: 'textField2'
            },
            {
              type: PropertyPaneFieldType.Checkbox,
              label: 'Checkbox',
              key: 'checkbox'
            }
          ]
        }
      ]
    }
  ]
};
const PropertyPane = jest.fn(() => ({
  render: jest.fn(() => null),
}));
const PropertyPaneGroup = jest.fn(() => ({
  add: jest.fn(() => null),
}));
const PropertyPaneCheckbox = jest.fn(() => ({
  onPropertyChange: jest.fn(() => null),
}));
const PropertyPaneTextField = jest.fn(() => ({
  onPropertyChange: jest.fn(() => null),
}));

