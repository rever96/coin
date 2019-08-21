import React, { Component } from 'react';
import { Alert, Card, CardBody, CardTitle } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
export default class CustomUI extends Component {
  render() {
    return (
      <div className={`icon-row-item mb-4`}>
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="my.titolo" />
            </CardTitle>
            <Alert color="primary" className="rounded">
              <IntlMessages id="alert.primary-text" />
            </Alert>
          </CardBody>
        </Card>
      </div>
    );
  }
}
