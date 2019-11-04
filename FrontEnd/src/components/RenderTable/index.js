import React from 'react';
import { Table, Column, Badge, MenuItem } from 'react-rainbow-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCog,
//   faPencilAlt,
//   faStore,
//   faPlus,
//   faBell,
//   faEllipsisV
// } from '@fortawesome/free-solid-svg-icons';

const badgeStyles = { color: '#1de9b6' };

const StatusBadge = ({ value }) => (
  <Badge label={value} variant="lightest" style={badgeStyles} />
);

function RenderTable(props) {
  console.log(props);
  return (
    <div className="rainbow-p-bottom_xx-large">
      <Table keyField="id" data={props.data}>
        <Column header="Name" field="name" />
        <Column header="Status" field="status" component={StatusBadge} />
        <Column header="Company" field="company" />
        <Column header="Email" field="email" />
        <Column type="action">
          <MenuItem
            label="Edit"
            onClick={(e, data) => console.log(`Edit ${data.name}`)}
          />
          <MenuItem
            label="Delete"
            onClick={(e, data) => console.log(`Delete ${data.name}`)}
          />
        </Column>
      </Table>
    </div>
  );
}

export default RenderTable;
