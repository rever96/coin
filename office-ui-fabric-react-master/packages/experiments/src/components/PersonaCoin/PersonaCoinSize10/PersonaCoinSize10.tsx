import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { ISlotProp } from '../../../Foundation';

export interface IPersonaCoinSizeProps {}

export type IPersonaCoinSize10Slot = ISlotProp<IPersonaCoinSizeProps>;

const styles = { root: { fontSize: 10 } };

const PersonaCoinSize10 = (): JSX.Element => {
  return <Icon iconName="Contact" styles={styles} />;
};

export default PersonaCoinSize10;
