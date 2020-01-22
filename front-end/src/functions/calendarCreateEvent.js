import { createTableRow, TABLENAMES } from '../data/tables';
import moment from 'moment';
import { notification } from 'antd';

export const creaEventoSubmit = component => {
  const {
    titolo,
    data,
    ora_inizio,
    ora_fine,
    contenuto,
    colore
  } = component.state.fields;
  if (titolo.value.length === 0) {
    return;
  }
  component.setState({
    confirmLoading: true
  });
  const evento = {
    data_inizio: moment(data.value)
      .hour(0)
      .minute(0)
      .add(ora_inizio.value.get('minutes'), 'minutes')
      .add(ora_inizio.value.get('hours'), 'hours')
      .toDate(),
    data_fine: moment(data.value)
      .hour(0)
      .minute(0)
      .add(ora_fine.value.get('minutes'), 'minutes')
      .add(ora_fine.value.get('hours'), 'hours')
      .toDate(),
    titolo: titolo.value,
    contenuto: contenuto.value,
    tipo: colore.value
  };
  createTableRow(component.props.dispatch, TABLENAMES.EVENTI, evento)
    .then(id => {
      component.setState({
        visible: false,
        confirmLoading: false,
        events: [
          ...component.state.events,
          {
            id: id,
            start: evento.data_inizio,
            end: evento.data_fine,
            title: evento.titolo,
            content: evento.contenuto,
            color: evento.tipo,
            table: TABLENAMES.EVENTI
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
};

export const eventsFromProps = props => {
  return props.eventi
    .map(e => {
      return {
        id: e.id,
        title: e.titolo,
        start: moment(e.data_inizio).toDate(),
        end: moment(e.data_fine).toDate(),
        content: e.contenuto,
        color: e.tipo,
        table: TABLENAMES.EVENTI
      };
    })
    .concat(
      props.ordini.map(e => {
        return {
          id: e.id,
          title: 'Ordine di ' + e.fk_cliente,
          start: moment(e.data_prevista_consegna).toDate(),
          end: moment(e.data_prevista_consegna).toDate(),
          color: 'green',
          table: TABLENAMES.ORDINI
        };
      })
    );
};
