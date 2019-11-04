import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Card from 'react-rainbow-components/components/Card';
import Input from 'react-rainbow-components/components/Input';
import Button from 'react-rainbow-components/components/Button';

function InsertRow(props) {
  const { handleSubmit, reset, onSubmit, fields } = props;
  const submit = values => {
    onSubmit(values);
    reset();
  };
  console.log(props);
  return (
    <Card
      className="react-rainbow-admin-forms_card rainbow-p-top_large"
      style={{ alignSelf: 'baseline' }}
    >
      <form noValidate onSubmit={handleSubmit(submit)}>
        <article className="rainbow-rainbow-forms_inputs-container">
          {fields.map((field, key) => (
            <Field
              key={key}
              className="rainbow-m-top_small"
              component={Input}
              name={field}
              label={field}
              type="text"
            />
          ))}
          <Button
            className="rainbow-m-top_medium"
            type="submit"
            variant="brand"
          >
            <span>Aggiungi</span>
          </Button>
        </article>
      </form>
    </Card>
  );
}
InsertRow.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

InsertRow.defaultProps = {
  onSubmit: () => {}
};

export default reduxForm({
  form: 'subscribe-form'
})(InsertRow);
