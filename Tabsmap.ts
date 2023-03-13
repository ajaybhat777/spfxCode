import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField,
  PropertyPaneGroup
} from '@microsoft/sp-webpart-base';
import * as strings from 'MyWebPartWebPartStrings';
import MyWebPart from './components/MyWebPart';
import { IMyWebPartProps } from './components/IMyWebPartProps';

export interface IMyWebPartWebPartProps {
  tabs: {
    title: string;
    active: boolean;
    url: string;
  }[];
}

export default class MyWebPartWebPart extends BaseClientSideWebPart<IMyWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMyWebPartProps> = React.createElement(
      MyWebPart,
      {
        tabs: this.properties.tabs
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const tabGroups: PropertyPaneGroup[] = this.properties.tabs.map((tab, index) => {
      return {
        groupName: `Tab ${index + 1}`,
        groupFields: [
          PropertyPaneCheckbox(`tabs[${index}].active`, {
            checked: tab.active,
            text: 'Active'
          }),
          PropertyPaneTextField(`tabs[${index}].title`, {
            label: 'Title',
            value: tab.title
          }),
          PropertyPaneTextField(`tabs[${index}].url`, {
            label: 'URL',
            value: tab.url
          })
        ]
      };
    });

    return {
      pages: [
        {
          header: {
            description: 'Configure the tabs of the web part'
          },
          groups: tabGroups
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfigurationAsync(): Promise<IPropertyPaneConfiguration> {
    return new Promise<IPropertyPaneConfiguration>((resolve, reject) => {
      if (this.context.environment.type === EnvironmentType.Local) {
        resolve({
          pages: [
            {
              header: {
                description: 'Configure the tabs of the web part'
              },
              groups: []
            }
          ]
        });
      } else if (this.context.environment.type === EnvironmentType.SharePoint ||
                 this.context.environment.type === EnvironmentType.ClassicSharePoint) {
        resolve(this.getPropertyPaneConfiguration());
      }
    });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath.indexOf('tabs') !== -1) {
      this.properties.tabs = this.properties.tabs.map((tab, index) => {
        if (propertyPath.indexOf(`tabs[${index}]`) !== -1) {
          const property = propertyPath.split(']').pop().replace(/\./g, '').replace(/\[/g, '');
          tab[property] = newValue;
        }
        return tab;
      });

      this.render();
    }
  }
}
