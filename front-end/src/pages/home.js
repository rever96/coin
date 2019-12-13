import React from 'react';
import { Row, Col, DatePicker, Divider, Input } from 'antd';
import moment from 'moment';
import configDatePicker from '../assets/Lang/it-IT/datepicker.json';
import Filtri from '../components/tags/filtri';
import ListaImpegni from '../components/collapsables/impegni';
import CreaImpegnoForm from '../components/forms/crea_impegno';

const { RangePicker } = DatePicker;
const { Search } = Input;

class Example extends React.Component {
  render() {
    return (
      <>
        <Row style={{}}>
          <Col
            style={{
              height: 'calc(100vh - 69px - 16px)',
              padding: '0px 8px'
            }}
            span={8}
          >
            <h2>Seleziona periodo</h2>
            <RangePicker
              defaultValue={[
                moment(moment.now()),
                moment(moment.now() + 24 * 3600 * 1000)
              ]}
              locale={configDatePicker}
            />
            <Divider />
            <h2>Filtri</h2>
            <Filtri></Filtri>
            <Divider />
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
            />
            <Divider />
            <h2>Crea Impegno</h2>
            <CreaImpegnoForm></CreaImpegnoForm>
          </Col>
          <Col
            style={{
              padding: '0px 8px',
              height: 'calc(100vh - 64px)',
              overflow: 'auto'
            }}
            span={16}
          >
            <ListaImpegni></ListaImpegni>
          </Col>
        </Row>
      </>
    );
  }
}

export default Example;
