import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import struttura from '../../assets/struttura.json';
import { setRows } from '../../data/tables';

class SelectRowTable extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchedColumn: '',
      righe: [],
      colonne: []
    };
    this.stillWaitingForData = true;
  }

  componentDidUpdate() {
    console.log(this.props);
    if (this.stillWaitingForData && this.props.tableData) {
      console.log('set rows');
      this.setState({
        righe: setRows(this.props.tableData)
      });
      const colonne = struttura
        .find(tabella => tabella.nome === this.props.tableName)
        .colonne.map((c, key) => {
          let colonna = {
            ...c,
            ...this.getColumnSearchProps(c.nome)
          };
          colonna.title = c.nome;
          colonna.dataIndex = c.nome;
          colonna.key = key;

          return colonna;
        });
      this.setState({
        colonne
      });
      this.stillWaitingForData = false;
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    console.log(this.stillWaitingForData);
    if (this.stillWaitingForData) {
      return <> spinner super figherrimo</>;
    }
    return <Table columns={this.state.colonne} dataSource={this.state.righe} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { tableName } = ownProps;
  if (
    !state.pending &&
    state.tableData[tableName] &&
    state.tableData[tableName].length > 0
  ) {
    return { tableData: state.tableData[tableName] };
  }
  return {};
};

export default connect(mapStateToProps)(SelectRowTable);
