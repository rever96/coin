import React from 'react';
import { Form, Icon, Input, TimePicker, DatePicker, notification } from 'antd';
import moment from 'moment';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';
import {
  updateTableRow,
  deleteTableRow,
  createTableRow
} from '../../data/tables';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreaImpegno extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
    document.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = e => {
    console.log('submit');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const row = {
          data_inizio: values.data_inizio,
          data_fine: values.data_fine,
          titolo: values.titolo
        };
        createTableRow(this.props.dispatch, 'Eventi', row)
          .then(id => {
            //aggiorno questa componente
            //perchè cambia lo stato del reducer, ma questa componente non è connessa
            console.log(id);
            this.setState({
              events: [
                ...this.state.events,
                {
                  id: id,
                  start: row.data_inizio,
                  end: row.data_fine,
                  title: row.titolo
                }
              ]
            });
          })
          .catch(error => {
            notification.error({
              message: `Operazione fallita`,
              description: error.toString(),
              placement: 'bottomRight',
              duration: 0
            });
          });
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
      <Form id="crea_impegno" layout="vertical" onSubmit={this.handleSubmit}>
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
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="contenuto"
          />
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CreaImpegno);
