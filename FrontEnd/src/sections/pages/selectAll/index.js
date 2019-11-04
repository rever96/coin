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
      tableName
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
  }

  render() {
    const { rows, tableName } = this.state;
    let tabella = <p>Loading...</p>;
    let form;
    if (rows.length > 0) {
      tabella = <RenderTable data={rows}></RenderTable>;
      form = <InsertRow fields={Object.keys(rows[0])}></InsertRow>;
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
