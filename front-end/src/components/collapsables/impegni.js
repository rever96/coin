import React from 'react';
import {
  Collapse,
  Row,
  Col,
  Divider,
  Typography,
  Icon,
  Popconfirm
} from 'antd';

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
    testo: 'ciao mondo!',
    tags: ['notification', 'wallet', 'file-image', 'file-text']
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
  constructor() {
    super();
    this.state = {
      overing: false,
      deleting: false
    };
  }
  mouseLeave() {
    this.setState({ overing: false });
  }

  mouseEnter() {
    this.setState({ overing: true });
  }

  stopPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  openDeletePopConfirm(e) {
    console.log(e);
    this.setState({ deleting: e });
  }
  elimina() {
    console.log('eliminato');
  }
  render() {
    console.log(this.props.tags);
    return (
      <div
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
      >
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
        {(this.state.overing || this.state.deleting) && (
          <div
            style={{
              float: 'right',
              height: '56px',
              width: '56px'
            }}
          >
            <Row>giallo</Row>
            <Row>
              <Popconfirm
                title="Sicuro di eliminare questo impegno? (questa azione non è reversibile)"
                onConfirm={this.elimina.bind(this)}
                okText="Elimina"
                cancelText="Annulla"
                onVisibleChange={this.openDeletePopConfirm.bind(this)}
              >
                <Icon
                  onClick={this.openDeletePopConfirm.bind(this)}
                  style={{ fontSize: '36px', color: 'red' }}
                  type="delete"
                />
              </Popconfirm>
            </Row>
          </div>
        )}
        <Row
          style={{
            height: '56px',
            marginLeft: '100px',
            marginRight: '56px'
          }}
        >
          <Col
            style={{ textAlign: 'left', padding: '0px 8px', height: '100%' }}
            span={24}
          >
            <Row>
              <Title level={4}>
                {this.props.titolo}
                {this.props.tags &&
                  this.props.tags.map((tag, key) => {
                    return <Icon key={key} type={tag}></Icon>;
                  })}
              </Title>
            </Row>
            <Row>
              <Text>{this.props.prefazione}</Text>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

class ListaImpegni extends React.Component {
  render() {
    console.log(data);
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
                    tags={tag.tags}
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
