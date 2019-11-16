import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ImageFit } from '../Image/Image.types';
import { DocumentCardImage } from './DocumentCardImage';
import { TestImages } from 'office-ui-fabric-react/lib/common/TestImages';

describe('DocumentCard', () => {
  it('renders DocumentCardImage correctly without an image provided', () => {
    const component = renderer.create(
      <DocumentCardImage
        height={150}
        iconProps={{
          iconName: 'OneNoteLogo',
          styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } }
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly with an invalid image', () => {
    const component = renderer.create(
      <DocumentCardImage
        height={150}
        imageSrc={'someinvalidurl'}
        iconProps={{
          iconName: 'OneNoteLogo',
          styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } }
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly with a valid image', () => {
    const component = renderer.create(
      <DocumentCardImage
        height={100}
        imageFit={ImageFit.cover}
        iconProps={{ iconName: 'OneNoteLogo', styles: { root: { color: '#813a7c' } } }}
        imageSrc={TestImages.documentPreviewTwo}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly without an image or icon', () => {
    const component = renderer.create(<DocumentCardImage height={100} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
