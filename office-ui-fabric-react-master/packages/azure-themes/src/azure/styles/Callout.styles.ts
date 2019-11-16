import { ICalloutContentStyleProps, ICalloutContentStyles } from 'office-ui-fabric-react/lib/Callout';
import { Depths } from '../AzureDepths';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      borderColor: semanticColors.inputBorder,
      borderStyle: StyleConstants.borderSolid,
      borderWidth: StyleConstants.borderWidth,
      boxShadow: Depths.depth8
    },
    calloutMain: {
      color: semanticColors.bodyText,
      fontSize: FontSizes.size12
    }
  };
};
