import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { CollapsibleSection } from '@uifabric/experiments/lib/CollapsibleSection';

export class CollapsibleSectionBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <CollapsibleSection key={1} defaultCollapsed={true} title="Title 1">
            Content 1
          </CollapsibleSection>
        </FocusZone>
      </div>
    );
  }
}
