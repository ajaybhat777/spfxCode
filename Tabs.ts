export interface IMyWebPartProps {
  tabs: ITab[];
}

export interface ITab {
  active: boolean;
  url: string;
  title: string;
}

export default class MyWebPart extends BaseClientSideWebPart<IMyWebPartProps> {
  
  public render(): void {
    // Use this.properties.tabs to render the web part based on the data entered in the property pane
  }
  
  protected getPropertyPaneConfiguration() {
    var groups = [];
    var tabLabels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];
    
    for (var i = 0; i < tabLabels.length; i++) {
      var tabLabel = tabLabels[i];
      var tabPropertiesObj = this.properties.tabs[i] || {};
      var groupFields = [
        PropertyPaneCheckbox('active', {
          text: 'Active',
          checked: tabPropertiesObj.active || false,
          onChanged: (value) => {
            this.properties.tabs[i].active = value;
            this.context.propertyPane.refresh();
          }
        }),
        PropertyPaneTextField('url', {
          label: 'URL',
          value: tabPropertiesObj.url || '',
          onChanged: (value) => {
            this.properties.tabs[i].url = value;
            this.context.propertyPane.refresh();
          }
        }),
        PropertyPaneTextField('title', {
          label: 'Title',
          value: tabPropertiesObj.title || '',
          onChanged: (value) => {
            this.properties.tabs[i].title = value;
            this.context.propertyPane.refresh();
          }
        })
      ];
      
      groups.push({
        groupName: tabLabel + ' properties',
        groupFields: groupFields
      });
    }
    
    return {
      pages: [
        {
          groups: groups
        }
      ]
    };
  }
  
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    if (propertyPath === 'tabs') {
      this.render();
    }
  }
  
  protected getPropertyPaneConfiguration() {
    return {
      pages: [
        {
          header: {
            description: 'Configure tabs'
          },
          groups: [
            {
              groupName: 'Tabs',
              groupFields: [
                {
                  type: PropertyPaneDynamicFieldSet.type,
                  label: 'Tab settings',
                  fields: [
                    PropertyPaneDynamicFieldSet.default({
                      label: 'Tabs',
                      value: this.properties.tabs,
                      fields: [
                        PropertyPaneCheckbox('active', {
                          text: 'Active',
                          checked: false
                        }),
                        PropertyPaneTextField('url', {
                          label: 'URL',
                          value: ''
                        }),
                        PropertyPaneTextField('title', {
                          label: 'Title',
                          value: ''
                        })
                      ]
                    })
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
