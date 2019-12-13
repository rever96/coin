import React from 'react';
import { Form, Icon, Input, Button, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreaImpegno extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('titolo') && getFieldError('titolo');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item>
          <DatePicker
            defaultValue={moment(moment.now())}
            locale={configDatePicker}
          />
          <TimePicker
            defaultValue={moment(moment.now() + 1 * 3600 * 1000)}
            format={'HH:mm'}
          />
          <TimePicker
            defaultValue={moment(moment.now() + 3 * 3600 * 1000)}
            format={'HH:mm'}
          />
        </Form.Item>
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('titolo', {
            rules: [{ required: true, message: 'Please input your titolo!' }]
          })(
            <Input
              prefix={<Icon type="info" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="titolo"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Input
            prefix={
              <Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="prefazione"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="contenuto"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'horizontal_login' })(CreaImpegno);
