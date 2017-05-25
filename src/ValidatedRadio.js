import React from 'react';
import PropTypes from 'prop-types';
import ValidatedInput from './ValidatedInput';
import {Radio} from 'react-bootstrap';

export default class ValidatedRadio extends ValidatedInput {
  render() {
    return (
      <Radio
        className={this.props.groupClassName}
        {...this.inputProps}
        disabled={this.props.disabled}
        value={this.props.value}
        checked={this.props.checked} >
        {this.props.children}
      </Radio>
    );
  }
}

ValidatedRadio.propTypes = Object.assign({}, ValidatedInput.propTypes, {
  name: PropTypes.string
});
