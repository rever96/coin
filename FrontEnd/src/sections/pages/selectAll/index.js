import React from 'react';
import { Breadcrumb, Breadcrumbs } from 'react-rainbow-components';
import { navigateTo } from '../../../history';
import PageHeader from '../../../components/PageHeader';
import RenderTable from '../../../components/RenderTable';
import InsertRow from '../../../components/InsertRow';
import './styles.css';

class SelectAllFromTable extends React.Component {
  constructor(props) {
    super(props);
    const tableName = this.props.match.params.tableName;
    this.state = {
      rows: [],
      tableName,
      columns: []
    };
  }

  componentDidMount() {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: this.state.tableName })
    };
    fetch('http://localhost:8080/api/v3/select', options)
      .then(response => response.json())
      .then(data => this.setState({ rows: data }));
    fetch('http://localhost:8080/api/v3/selectStruttura', options)
      .then(response => response.json())
      .then(data => this.setState({ columns: data }));
  }

  render() {
    const { rows, tableName, columns } = this.state;
    console.log(columns);
    let tabella = <p>Loading...</p>;
    let form;
    if (rows.length > 0 && columns.length > 0) {
      tabella = (
        <RenderTable
          values={rows}
          headers={columns.filter(
            c => c.column_name !== 'id' && !c.column_name.includes('fk_')
          )}
        ></RenderTable>
      );
      form = (
        <InsertRow
          fields={columns.filter(
            c => c.column_name !== 'id' && !c.column_name.includes('fk_')
          )}
        ></InsertRow>
      );
    }
    return (
      <>
        <div className="react-rainbow-admin-orders_header-container">
          <Breadcrumbs>
            <Breadcrumb label="Pages" onClick={() => navigateTo('/pages')} />
            <Breadcrumb label="Vista tabella" />
          </Breadcrumbs>
          <PageHeader
            className="react-rainbow-admin-orders_header"
            title={tableName}
            description="descrizione pagina tabella"
          />
        </div>
        {form}
        {tabella}
      </>
    );
  }
}
export default SelectAllFromTable;
