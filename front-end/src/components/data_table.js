import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export class DataTableDemo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      cars: [{ vin: 'ciao', year: 2013, brand: 'prova', color: 'blue' }]
    });
  }

  render() {
    console.log(this.state.cars);
    return (
      <DataTable value={this.state.cars}>
        <Column field="vin" header="Vin" />
        <Column field="year" header="Year" />
        <Column field="brand" header="Brand" />
        <Column field="color" header="Color" />
      </DataTable>
    );
  }
}
