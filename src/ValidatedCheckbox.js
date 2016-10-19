import React from 'react';
import ReactDOM from 'react-dom';
import ValidatedInput from './ValidatedInput';
import { Checkbox } from 'react-bootstrap';

export default class ValidatedCheckbox extends ValidatedInput {
  getChecked() {
    let element = ReactDOM.findDOMNode(this.input);
    if (element) {
      return element.checked;
    }
    return false;
  }

  render() {
    return (
      <Checkbox
        inputRef={ref => { this.input = ref; }}
        validationState={this.props.validationState}
        {...this.inputProps} >
        {this.props.children}
      </Checkbox>
    );
  }
}

ValidatedCheckbox.defaultProps = {
  type: 'checkbox'
};
