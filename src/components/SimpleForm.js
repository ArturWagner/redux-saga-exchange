import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Input, Button, Message } from 'semantic-ui-react';

class SimpleForm extends Component {

  currencyInput({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;
    return (
      <div>
        {hasError &&
          <Message
            error
            header='Error'
            content={error} />
        }
        <Input 
          error={hasError}
          fluid 
          placeholder="Currency..."
          {...input}
          {...custom} />
      </div>
    );
  }

  submit({ currency }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ 
        type: 'FETCH_EXCHANGE',
        currency,
        resolve,
        reject 
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name="currency" component={this.currencyInput} /> 
        <br/> 
        <Button fluid type="submit">Submit</Button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.currency || values.currency.trim() === '') {
    errors.currency = 'currency required'
  } 
  return errors
}


export default reduxForm({
  form: 'simple',
  validate
})(SimpleForm)
