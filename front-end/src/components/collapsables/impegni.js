import React from 'react';
import { Collapse, Row, Col, Divider, Typography, Icon } from 'antd';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const ExternalPanelStyle = {
  background: '#fff',
  borderRadius: 10,
  marginBottom: 24,
  overflow: 'hidden',
  border: '1px solid rgb(212, 212, 212)'
};

const data = [
  {
    color: '#00f',
    name: 'John Brown',
    dataInizio: '12:00',
    dataFine: '13:30',
    testo: 'ciao mondo!'
  },
  {
    color: '#f00',
    name: 'Titolo2',
    dataInizio: 12,
    dataFine: 13,
    testo: 'ciao mondo!'
  },
  {
    color: '#f0f',
    name: 'Titolo3',
    dataInizio: 12,
    dataFine: 13,
    testo: 'ciao mondo!'
  },
  {
    color: '#0f0',
    name: 'Titolo4',
    dataInizio: 12,
    dataFine: 13,
    testo: 'ciao mondo!'
  }
];

class AccordionHeader extends React.PureComponent {
  render() {
    return (
      <>
        <Row
          style={{
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Col span={20}>{this.props.children}</Col>
          <Col span={4}>giallo</Col>
        </Row>
        <div
          style={{
            float: 'left',
            height: '56px',
            width: '100px',
            borderRight: '4px',
            borderRightStyle: 'solid',
            borderRightColor: this.props.color
          }}
        >
          <Text style={{ fontSize: '24px' }} strong type="danger">
            {this.props.dataInizio}
          </Text>
          <Divider style={{ margin: '4px 0px' }} />
          <Text type="warning">{this.props.dataFine}</Text>
        </div>
        <Row
          style={{
            height: '56px',
            marginLeft: '100px'
          }}
        >
          <Col
            style={{ textAlign: 'left', padding: '0px 8px', height: '100%' }}
            span={20}
          >
            <Row>
              <Title level={4}>{this.props.titolo}</Title>
            </Row>
            <Row>
              <Text>{this.props.prefazione}</Text>
            </Row>
          </Col>
          <Col style={{ height: '100%' }} span={4}>
            <Icon type="delete" />
          </Col>
        </Row>
      </>
    );
  }
}

class ListaImpegni extends React.Component {
  render() {
    return (
      <>
        <Collapse style={{}} bordered={false} accordion={true}>
          {data.map((tag, key) => {
            return (
              <Panel
                showArrow={false}
                header={
                  <AccordionHeader
                    color={tag.color}
                    dataInizio={tag.dataInizio}
                    dataFine={tag.dataFine}
                    titolo={tag.name}
                    prefazione={tag.testo}
                  ></AccordionHeader>
                }
                style={ExternalPanelStyle}
                key={key}
              >
                {tag.testo}
              </Panel>
            );
          })}
        </Collapse>
      </>
    );
  }
}

export default ListaImpegni;
