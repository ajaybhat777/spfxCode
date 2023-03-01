public render(): void {
  const element: React.ReactElement<IExampleWebPartProps> = React.createElement(
    ContentAggregator,
    {
      propertyValue: this._propertyValue,
    }
  );

  const container = this.domElement.querySelector('#contentAggregatorContainer');

  // Remove any existing content from the container element
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Render the updated element in the container element
  ReactDOM.render(element, container);
}

protected onInit(): Promise<void> {
  return super.onInit().then(() => {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'Loading...');
    this._propertyValue = this.properties.description;
    this.render();

    // Add the container element if it doesn't exist yet
    if (!this.domElement.querySelector('#contentAggregatorContainer')) {
      const container = document.createElement('div');
      container.setAttribute('id', 'contentAggregatorContainer');
      this.domElement.appendChild(container);
    }
  });
}
