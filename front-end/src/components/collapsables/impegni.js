import React from 'react';
import { Collapse, Row, Col, Divider, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;
const ExternalPanelStyle = {
  background: '#fff',
  borderRadius: 10,
  marginBottom: 24,
  overflow: 'hidden',
  border: '1px solid rgb(212, 212, 212)'
};

const badgeStyle = {
  backgroundColor: '#fff',
  color: '#999',
  boxShadow: '0 0 0 1px #d9d9d9 inset',
  right: '10px'
};

const data = [
  {
    color: '#00f',
    name: 'John Brown',
    dataInizio: 12,
    dataFine: 13,
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
            display: 'inline-block',
            textAlign: 'left',
            height: '56px',
            width: '100px'
          }}
        >
          <Row>
            <Col
              style={{
                height: '100%',
                borderRight: '4px',
                borderRightStyle: 'solid',
                borderRightColor: this.props.color
              }}
              span={24}
            >
              <p>data 1</p>
              <p>data 2</p>
            </Col>
          </Row>
        </div>

        <div
          style={{
            display: 'inline-block',
            textAlign: 'left',
            height: '56px',
            width: 'auto'
          }}
        >
          <Row>
            <Col
              style={{ backgroundColor: 'red', height: '100%' }}
              span={20}
            ></Col>
            <Col
              style={{ backgroundColor: 'green', height: '100%' }}
              span={4}
            ></Col>
          </Row>
        </div>
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
                  <AccordionHeader color={tag.color}>
                    <Title level={4} style={{ margin: '0px' }}>
                      {tag.name}
                    </Title>
                  </AccordionHeader>
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
