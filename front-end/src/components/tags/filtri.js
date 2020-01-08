import React from 'react';
import { Row, Col, Tag } from 'antd';

const data = [
  {
    color: '#f70000',
    name: 'John Brown'
  },
  {
    color: '#2db7f5',
    name: 'Joe Black'
  },
  {
    color: '#87d068',
    name: 'Jim Green'
  },
  {
    color: '#108ee9',
    name: 'Jim Red'
  },
  {
    color: '#108ee9',
    name: 'Jim Red'
  },
  {
    color: '#108ee9',
    name: 'Jim Red'
  }
];

class Filtri extends React.Component {
  render() {
    return (
      <>
        <Row>
          {data.map((tag, key) => {
            return (
              <Col style={{ padding: '8px' }} key={key} span={8}>
                <Tag color={tag.color}>{tag.name}</Tag>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default Filtri;
