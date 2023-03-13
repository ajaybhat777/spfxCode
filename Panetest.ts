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
