import React from 'react';
import { Form, Input, TimePicker, DatePicker, Select } from 'antd';
// import moment from 'moment';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';

const { TextArea } = Input;
const { Option } = Select;

export default Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      data: Form.createFormField({
        ...props.data,
        value: props.data.value
      }),
      ora_inizio: Form.createFormField({
        ...props.ora_inizio,
        value: props.ora_inizio.value
      }),
      ora_fine: Form.createFormField({
        ...props.ora_fine,
        value: props.ora_fine.value
      }),
      titolo: Form.createFormField({
        ...props.titolo,
        value: props.titolo.value
      }),
      contenuto: Form.createFormField({
        ...props.contenuto,
        value: props.contenuto.value
      }),
      colore: Form.createFormField({
        ...props.colore,
        value: props.colore.value
      })
    };
  }
  // onValuesChange(_, values) {
  //   console.log(values);
  // }
})(props => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('titolo') && getFieldError('titolo');
  return (
    <Form layout="vertical">
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('data')(<DatePicker locale={configDatePicker} />)}

        {getFieldDecorator('ora_inizio')(<TimePicker format={'HH:mm'} />)}

        {getFieldDecorator('ora_fine')(<TimePicker format={'HH:mm'} />)}
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
      <Form.Item
        labelAlign="left"
        label="Colore"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('colore')(
          <Select>
            <Option value="blue">blue</Option>
            <Option value="yellow">yellow</Option>
            <Option value="green">green</Option>
            <Option value="red">red</Option>
            <Option value="gray">gray</Option>
          </Select>
        )}
      </Form.Item>
    </Form>
  );
});
