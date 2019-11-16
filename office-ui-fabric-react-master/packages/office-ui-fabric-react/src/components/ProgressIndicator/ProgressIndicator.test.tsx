import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ProgressIndicator } from './ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders ProgressIndicator correctly', () => {
    const component = renderer.create(<ProgressIndicator label="Test" description="Test" percentComplete={0.75} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders indeterminate ProgressIndicator correctly', () => {
    const component = renderer.create(<ProgressIndicator label="Test" description="Test" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with no progress', () => {
    const component = renderer.create(<ProgressIndicator label="Test" description="Test" progressHidden={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with no label or description', () => {
    const component = renderer.create(<ProgressIndicator />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders React content', () => {
    const component = renderer.create(<ProgressIndicator label={<span>Test</span>} description={<span>Test</span>} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
