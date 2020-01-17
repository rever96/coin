import React from 'react';
import { Form, Input, DatePicker, InputNumber, Radio } from 'antd';
import ModalSelectRow from '../modals/modal_fk';
import configDatePicker from '../../assets/Lang/it-IT/datepicker.json';
import { TABLENAMES } from '../../data/tables';

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
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="cliente"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.CLIENTI}
          fk={props.fk_cliente}
          handleOk={props.fk_clienteSET}
        ></ModalSelectRow>
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
    console.log(props);
    const fields = {};
    for (const fieldName in props) {
      if (fieldName === 'onChange' || fieldName.startsWith('fk')) {
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
})(props => (
  <FormClientiStatefull
    {...props}
    form={{ ...props.form }}
  ></FormClientiStatefull>
));

class FormClientiStatefull extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator('partita_iva')(
            <Input placeholder="Partita Iva" />
          )}
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
              <Radio.Button value="cliente">cliente</Radio.Button>
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
            <TextArea
              placeholder="note"
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
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
          <ModalSelectRow
            childTableName={'settimane'}
            fk={this.props.fk_orario}
            handleOk={this.props.fk_orarioSET}
          ></ModalSelectRow>
        </Form.Item>
        {/* <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="orario consegne"
          labelAlign="left"
        >
          <ModalSelectRow
            childTableName={'settimane'}
            fk={this.props.fk_orario_consegne}
            handleOk={this.props.fk_orario_consegneSET}
          ></ModalSelectRow>
        </Form.Item> */}
        <Form.Item
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="proprietario"
          labelAlign="left"
        >
          <ModalSelectRow
            childTableName={'persone'}
            fk={this.props.fk_proprietario}
            handleOk={this.props.fk_proprietarioSET}
          ></ModalSelectRow>
        </Form.Item>
      </Form>
    );
  }
}

export const FormDDV = Form.create({
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
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data"
        labelAlign="left"
      >
        {getFieldDecorator('data')(<DatePicker locale={configDatePicker} />)}
      </Form.Item>
      <Form.Item
        label="km percorsi"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('km')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('zona_interessata')(
          <Input placeholder="Zona interessata" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('tipo')(<Input placeholder="Tipo" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="veicolo"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.VEICOLI}
          fk={props.fk_veicolo}
          handleOk={props.fk_veicoloSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="capo viaggio"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.PERSONE}
          fk={props.fk_capo_viaggio}
          handleOk={props.fk_capo_viaggioSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="assistente"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.PERSONE}
          fk={props.fk_assistente}
          handleOk={props.fk_assistenteSET}
        ></ModalSelectRow>
      </Form.Item>
    </Form>
  );
});

export const FormDepositi = Form.create({
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
        {getFieldDecorator('luogo')(<Input placeholder="luogo" />)}
      </Form.Item>
      <Form.Item
        label="capienza"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('capienza')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
    </Form>
  );
});

export const FormMerci = Form.create({
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
        {getFieldDecorator('nome')(<Input placeholder="Nome" />)}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data scadenza"
        labelAlign="left"
      >
        {getFieldDecorator('scadenza')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        label="Costo unitario"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('costo_unitario')(<InputNumber />)}
      </Form.Item>
      <Form.Item
        label="Peso unitario"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('peso_unitario')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('tipo')(<Input placeholder="Tipo" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
    </Form>
  );
});

export const FormProdotti = Form.create({
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
        {getFieldDecorator('nome')(<Input placeholder="Nome" />)}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data scadenza"
        labelAlign="left"
      >
        {getFieldDecorator('data_scadenza')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data confezionamento"
        labelAlign="left"
      >
        {getFieldDecorator('data_confezionamento')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        label="Costo unitario"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('costo_unitario')(<InputNumber />)}
      </Form.Item>
      <Form.Item
        label="Peso unitario"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('peso_unitario')(<InputNumber />)}
      </Form.Item>
      <Form.Item
        label="Quantità"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('quantita')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('tipo')(<Input placeholder="Tipo" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('lotto')(<Input placeholder="Lotto" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Deposito"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.DEPOSITI}
          fk={props.fk_deposito}
          handleOk={props.fk_depositoSET}
        ></ModalSelectRow>
      </Form.Item>
    </Form>
  );
});

export const FormLavorazioni = Form.create({
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
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data"
        labelAlign="left"
      >
        {getFieldDecorator('data')(<DatePicker locale={configDatePicker} />)}
      </Form.Item>
      <Form.Item
        labelAlign="left"
        label="Tipo"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('tipo')(
          <Radio.Group>
            <Radio.Button value="mov1">mov1</Radio.Button>
            <Radio.Button value="mov2">mov2</Radio.Button>
            <Radio.Button value="op1">op1</Radio.Button>
            <Radio.Button value="altro">altro</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        label="Quantità"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('quantita')(<InputNumber />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Deposito prima"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.DEPOSITI}
          fk={props.fk_deposito_prima}
          handleOk={props.fk_deposito_primaSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Deposito dopo"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.DEPOSITI}
          fk={props.fk_deposito_dopo}
          handleOk={props.fk_deposito_dopoSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Merce prima"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.MERCI}
          fk={props.fk_merce_prima}
          handleOk={props.fk_merce_primaSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Merce dopo"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.MERCI}
          fk={props.fk_merce_dopo}
          handleOk={props.fk_merce_dopoSET}
        ></ModalSelectRow>
      </Form.Item>
    </Form>
  );
});

export const FormOrdini = Form.create({
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
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data Ordine"
        labelAlign="left"
      >
        {getFieldDecorator('data_ordine')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data consegna prevista"
        labelAlign="left"
      >
        {getFieldDecorator('data_prevista_consegna')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        labelAlign="left"
        label="Come effettuato"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('come_effettuato')(
          <Radio.Group>
            <Radio.Button value="telefono">telefono</Radio.Button>
            <Radio.Button value="whatsapp">whatsapp</Radio.Button>
            <Radio.Button value="email">email</Radio.Button>
            <Radio.Button value="persona">persona</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data consegna ultima"
        labelAlign="left"
      >
        {getFieldDecorator('data_ultima')(
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
        label="Responsabile"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.PERSONE}
          fk={props.fk_responsabile}
          handleOk={props.fk_responsabileSET}
        ></ModalSelectRow>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Cliente"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.CLIENTI}
          fk={props.fk_cliente}
          handleOk={props.fk_clienteSET}
        ></ModalSelectRow>
      </Form.Item>
    </Form>
  );
});

export const FormSpedizioni = Form.create({
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
      <Form.Item
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Data Ritiro"
        labelAlign="left"
      >
        {getFieldDecorator('data_ritiro')(
          <DatePicker locale={configDatePicker} />
        )}
      </Form.Item>
      <Form.Item
        labelAlign="left"
        label="Servizio"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('servizio')(
          <Radio.Group>
            <Radio.Button value="telefono">telefono</Radio.Button>
            <Radio.Button value="whatsapp">whatsapp</Radio.Button>
            <Radio.Button value="email">email</Radio.Button>
            <Radio.Button value="persona">persona</Radio.Button>
          </Radio.Group>
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
        label="Responsabile"
        labelAlign="left"
      >
        <ModalSelectRow
          childTableName={TABLENAMES.PERSONE}
          fk={props.fk_responsabile}
          handleOk={props.fk_responsabileSET}
        ></ModalSelectRow>
      </Form.Item>
    </Form>
  );
});

export const FormSettimane = Form.create({
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
        {getFieldDecorator('lunedi')(<Input placeholder="Lunedì" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('martedi')(<Input placeholder="Martedì" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('mercoledi')(<Input placeholder="Mercoledì" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('giovedi')(<Input placeholder="Giovedì" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('venerdi')(<Input placeholder="Venerdì" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('sabato')(<Input placeholder="Sabato" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('domenica')(<Input placeholder="Domenica" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('note')(
          <TextArea placeholder="note" autoSize={{ minRows: 2, maxRows: 10 }} />
        )}
      </Form.Item>
    </Form>
  );
});
