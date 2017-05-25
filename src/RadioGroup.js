import React from 'react';
import PropTypes from 'prop-types';
import ValidatedRadio from './ValidatedRadio';
import InputContainer from './InputContainer';
import classNames from 'classnames';
import {FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';

export default class RadioGroup extends InputContainer {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || props.value
    };
  }

  componentWillMount() {
    super.componentWillMount();

    this.props._registerInput(this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.props._unregisterInput(this);
  }

  getValue() {
    let input = this._inputs[ this.props.name ];

    let value;

    input.forEach(ipt => {
      if (this.props.value === ipt.getValue()) {
        value = ipt.getValue();
      }
    });

    return value;
  }

  render() {
    return (
      <FormGroup validationState={this.props.validationState}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        <div
          ref='control'
          className={this.props.wrapperClassName}
          value={this.props.value} >
          {this._renderChildren()}
        </div>
      </FormGroup>
    );
  }

  _renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (child.type !== ValidatedRadio) {
        throw new Error('Only Radio component is allowed inside RadioGroup');
      }

      return React.cloneElement(child, {
        type            : 'radio',
        checked         : this.props.value === child.props.value,
        name            : this.props.name,
        onChange        : this._onChange.bind(this),
        _registerInput  : this.registerInput.bind(this),
        _unregisterInput: this.unregisterInput.bind(this)
      });
    });
  }

  _onChange(e) {
    if (!e.target) {
      return;
    }

    this.setState({
      value: e.target.value
    });

    this.props.onChange(e);
  }
}

RadioGroup.propTypes = {
  hasFeedback     : PropTypes.bool,
  bsSize (props) {
    return PropTypes.oneOf(['small', 'medium', 'large'])
    .apply(null, arguments);
  },
  bsStyle         : PropTypes.oneOf(['success', 'warning', 'error']),
  groupClassName  : PropTypes.string,
  labelClassName  : PropTypes.string,
  validationEvent : PropTypes.oneOf([
    '', 'onChange'
  ]),
  validate        : PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  errorHelp       : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

RadioGroup.defaultProps = {
  validationEvent: '',
  onChange       : () => {}
};
