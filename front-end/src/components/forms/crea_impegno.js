import React from 'react';
import { Form, Input, TimePicker, DatePicker, notification } from 'antd';
import moment from 'moment';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';
import {
  updateTableRow,
  deleteTableRow,
  createTableRow
} from '../../data/tables';
import { creaEvento, modificaEvento, eliminaEvento } from '../../pages/home';
const { TextArea } = Input;
class CreaImpegno extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: null
    };
  }
  componentDidMount() {
    console.log(this.props.statoEvento);
    document.addEventListener('submit', this.creaEvento);
    this.setState({
      submit: this.creaEvento
    });
    // switch (this.props.statoEvento) {
    //   case creaEvento:
    //     console.log('omg');
    //     document.addEventListener('submit', this.creaEvento);
    //     break;
    //   case modificaEvento:
    //     document.addEventListener('submit', this.creaEvento);
    //     break;
    //   case eliminaEvento:
    //     document.addEventListener('submit', this.creaEvento);
    //     break;
    //   default:
    //     break;
    // }
  }
  componentWillUnmount() {
    console.log('unmount');
    document.removeEventListener(this.props.statoEvento);
  }

  componentDidUpdate() {
    console.log('evento form update');
  }

  creaEvento = e => {
    console.log('submit');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const row = {
          data_inizio: moment(values.data)
            .add(moment(values.ora_inizio))
            .toDate(),
          data_fine: moment(values.data)
            .add(moment(values.ora_fine))
            .toDate(),
          titolo: values.titolo,
          contenuto: values.contenuto
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
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('titolo') && getFieldError('titolo');
    return (
      <Form layout="vertical" id="crea_impegno" onSubmit={this.state.submit}>
        <Form.Item validateStatus={''} help={''}>
          {getFieldDecorator('data', {
            initialValue: moment(this.props.data_inizio)
          })(<DatePicker locale={configDatePicker} />)}

          {getFieldDecorator('ora_inizio', {
            initialValue: moment(this.props.data_inizio)
          })(<TimePicker format={'HH:mm'} />)}

          {getFieldDecorator('ora_fine', {
            initialValue: moment(this.props.data_fine)
          })(<TimePicker format={'HH:mm'} />)}
        </Form.Item>
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('titolo', {
            rules: [{ required: true, message: 'Please input your titolo!' }]
          })(<Input placeholder="titolo" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('contenuto')(
            <TextArea
              placeholder="contenuto"
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CreaImpegno);
