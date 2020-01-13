import React from 'react';
import { Form, Input, DatePicker, InputNumber, Radio } from 'antd';
import ModalSelectRow from '../modals/modal_fk';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';

const { TextArea } = Input;

export const FormVeicoli = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const fields = {};
    for (const fieldName in props) {
      if (fieldName === 'onChange') {
        continue;
      }
      fields[fieldName] = Form.createFormField({
        ...props[fieldName],
        value: props[fieldName].value
      });
    }
    return fields;
  }
  // onValuesChange(_, values) {
  //   console.log(values);
  // }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="vertical">
      <Form.Item>
        {getFieldDecorator('targa')(<Input placeholder="targa" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('km_litro')(
          <Input type="number" placeholder="km al litro" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
    </Form>
  );
});

export const FormPersone = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const fields = {};
    for (const fieldName in props) {
      if (fieldName === 'onChange') {
        continue;
      }
      fields[fieldName] = Form.createFormField({
        ...props[fieldName],
        value: props[fieldName].value
      });
    }
    return fields;
  }
  // onValuesChange(_, values) {
  //   console.log(values);
  // }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="vertical">
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('nome')(<Input placeholder="nome" />)}
        {getFieldDecorator('cognome')(<Input placeholder="cognome" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('data_nascita')(
          <DatePicker locale={configDatePicker} placeholder="data di nascita" />
        )}
      </Form.Item>
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('telefono')(<Input placeholder="telefono" />)}
        {getFieldDecorator('email')(<Input placeholder="email" />)}
      </Form.Item>
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('ruolo')(<Input placeholder="ruolo" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
    </Form>
  );
});

export const FormClienti = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const fields = {};
    for (const fieldName in props) {
      if (fieldName === 'onChange') {
        continue;
      }
      fields[fieldName] = Form.createFormField({
        ...props[fieldName],
        value: props[fieldName].value
      });
    }
    return fields;
  }
  // onValuesChange(_, values) {
  //   console.log(values);
  // }
})(props => {
  const { getFieldDecorator } = props.form;
  const selezionaOrario = fk => {
    console.log(fk);
    fk_orario = fk;
  };
  let fk_orario = undefined;
  return (
    <Form layout="horizontal">
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('intestazione_legale')(
          <Input placeholder="Intestazione Legale" />
        )}
        {/* </Form.Item>
      <Form.Item> */}
        {getFieldDecorator('indirizzo_sede_legale')(
          <Input placeholder="Indirizzo Sede Legale" />
        )}
      </Form.Item>
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('telefono')(<Input placeholder="telefono" />)}
        {/* </Form.Item>
      <Form.Item> */}
        {getFieldDecorator('email')(<Input placeholder="email" />)}
      </Form.Item>
      <Form.Item validateStatus={''} help={''}>
        {getFieldDecorator('indirizzo')(<Input placeholder="Indirizzo" />)}
        {/* </Form.Item>
      <Form.Item> */}
        {getFieldDecorator('gmap')(
          <Input placeholder="Coordinate Google Maps" />
        )}
      </Form.Item>
      <Form.Item
        label="N coperti"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('n_coperti')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('attivita_fruitrice')(
          <Input placeholder="Attivita Fruitrice" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('partita_iva')(<Input placeholder="Partita Iva" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('codice_univoco')(
          <Input placeholder="Codice Univoco" />
        )}
      </Form.Item>
      <Form.Item
        labelAlign="left"
        label="Accessibilita Consegne"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('accessibilita_consegne')(
          <Radio.Group>
            <Radio.Button value="facile">facile</Radio.Button>
            <Radio.Button value="medio">medio</Radio.Button>
            <Radio.Button value="difficile">difficile</Radio.Button>
            <Radio.Button value="impossibile">impossibile</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        labelAlign="left"
        label="Tipo Cliente"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('tipo_cliente')(
          <Radio.Group>
            <Radio.Button value="facile">cliente</Radio.Button>
            <Radio.Button value="potenziale cliente">
              potenziale cliente
            </Radio.Button>
            <Radio.Button value="oppositore">oppositore</Radio.Button>
            <Radio.Button value="oppositore perdi tempo">
              oppositore perdi tempo
            </Radio.Button>
            <Radio.Button value="ex cliente">ex cliente</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data Contatto futuro"
        labelAlign="left"
      >
        {getFieldDecorator('data_contatto_futuro')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data Di Inserimento"
        labelAlign="left"
      >
        {getFieldDecorator('data_inserimento')(
          <DatePicker disabled locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="orario"
        labelAlign="left"
      >
        {getFieldDecorator('orario')(
          <ModalSelectRow
            childTableName={'settimane'}
            fk={fk_orario}
            handleOK={selezionaOrario}
          ></ModalSelectRow>
        )}
      </Form.Item>
    </Form>
  );
});
