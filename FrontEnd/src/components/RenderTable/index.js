import React from 'react';
import { Table, Column, MenuItem } from 'react-rainbow-components';

function RenderTable(props) {
  return (
    <div className="rainbow-p-bottom_xx-large">
      <Table keyField="id" data={props.data}>
        {Object.keys(props.data[0]).map((column, key) => (
          <Column key={key} header={column} field={column} />
        ))}
        <Column type="action">
          <MenuItem
            label="Edit"
            onClick={(e, data) => console.log(`Edit ${data.email}`)}
          />
          <MenuItem
            label="Delete"
            onClick={(e, data) => console.log(`Delete ${data.email}`)}
          />
        </Column>
      </Table>
    </div>
  );
}

export default RenderTable;
