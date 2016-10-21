import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {
  Form,
  ValidatedCheckbox,
  ValidatedInput,
  RadioGroup,
  ValidatedRadio } from '../index';

let onSubmit;
let onChange;
let checkbox;

describe('ValidatedCheckbox', () => {

  beforeEach(() => {
    onSubmit = sinon.spy();
    onChange = sinon.spy();

    checkbox = (checked) => {
      return mount(
        <Form
          onValidSubmit={onSubmit}>
          <ValidatedCheckbox
            name='agree'
            checked={checked}
            onChange={onChange}
            validate='isChecked' >
            I agree
          </ValidatedCheckbox>
        </Form>
      );
    }
  });

  it('isChecked false shows error', () => {
    const wrapper = checkbox(false);
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(1);
    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(onChange.calledOnce).to.equal(true);
  });

  it('isChecked true succeeds', () => {
    const wrapper = checkbox(true);
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(0);
    expect(onSubmit.calledOnce).to.equal(true);
  });
});

let input;

describe('ValidatedInput', () => {

  beforeEach(() => {
    onSubmit = sinon.spy();
    onChange = sinon.spy();

    input = (value, validate) => {
      return mount(
        <Form
          onValidSubmit={onSubmit}
          validationEvent='onBlur'>
          <ValidatedInput
            name="password"
            type="password"
            value={value}
            onChange={onChange}
            label="Your personal password"
            validate={validate}
            errorHelp={{
              required: 'Please specify a password',
              isLength: 'Password must be at least 6 characters'
            }} />
        </Form>
      );
    }
  });


  it('required called', () => {
    const wrapper = input('', 'required,isLength:6:60');
    wrapper.find('form').simulate('submit');
    wrapper.find('input').simulate('change', {target: {value: 'password'}});
    expect(onChange.calledOnce).to.equal(true);
    expect(onSubmit.callCount).to.equal(0);
    expect(wrapper.find('.help-block')).to.have.text('Please specify a password');
    expect(wrapper.find('.has-error')).to.have.length(1);
  });

  it('isLength called', () => {
    const wrapper = input('blah', 'required,isLength:6:60');
    wrapper.find('form').simulate('submit');
    expect(onSubmit.callCount).to.equal(0);
    expect(wrapper.find('.help-block')).to.have.text('Password must be at least 6 characters');
    expect(wrapper.find('.has-error')).to.have.length(1);
  });

  it('submit called', () => {
    const wrapper = input('password', 'required,isLength:6:60');
    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledOnce).to.equal(true);
    expect(wrapper.find('.has-error')).to.have.length(0);
  });

  it('required number', () => {
    const wrapper = input(8.53, 'required');
    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledOnce).to.equal(true);
    expect(wrapper.find('.has-error')).to.have.length(0);
  });
});

let radioGroup;

describe('RadioGroup', () => {

  beforeEach(() => {
    onSubmit = sinon.spy();
    onChange = sinon.spy();

    radioGroup = (value) => {
      return mount(
        <Form
          onValidSubmit={onSubmit}>
          <RadioGroup
            name='radio'
            value={value}
            onChange={onChange}
            label='Which one is better?'
            validate={v => v === 'cola'}
            errorHelp='Pepsi? Seriously?'
            labelClassName='col-xs-2'
            wrapperClassName='col-xs-10'>

            <ValidatedRadio value='cola' label='Cola' />
            <ValidatedRadio value='pepsi' label='Pepsi' />
          </RadioGroup>
        </Form>
      );
    }
  });

  it('no value shows error', () => {
    const wrapper = radioGroup(null);
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(1);
    expect(wrapper.find('.help-block')).to.have.text('Pepsi? Seriously?');
    wrapper.find('input[type="radio"][value="pepsi"]').simulate('change');
    expect(onChange.calledOnce).to.equal(true);
  });

  it('pepsi value shows error', () => {
    const wrapper = radioGroup('pepsi');
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(1);
    expect(wrapper.find('.help-block')).to.have.text('Pepsi? Seriously?');
  });

  it('cola value shows success', () => {
    const wrapper = radioGroup('cola');
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(0);
    expect(onSubmit.calledOnce).to.equal(true);
  });
});

let radioGroupRequired;

describe('RadioGroup with required', () => {

  beforeEach(() => {
    onSubmit = sinon.spy();
    onChange = sinon.spy();

    radioGroupRequired = (value) => {
      return mount(
        <Form
          onValidSubmit={onSubmit}>
          <RadioGroup
            name='radio'
            value={value}
            onChange={onChange}
            label='Which one is better?'
            validate='required'
            errorHelp='Click one!'>

            <ValidatedRadio value='cola' label='Cola' />
            <ValidatedRadio value='pepsi' label='Pepsi' />
          </RadioGroup>
        </Form>
      );
    }
  });

  it('no value shows error', () => {
    const wrapper = radioGroupRequired(null);
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(1);
    expect(wrapper.find('.help-block')).to.have.text('Click one!');
    wrapper.find('input[type="radio"][value="pepsi"]').simulate('change');
    expect(onChange.calledOnce).to.equal(true);
  });

  it('value submits', () => {
    const wrapper = radioGroupRequired('cola');
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(0);
    wrapper.find('input[type="radio"][value="cola"]').simulate('change');
    expect(onSubmit.calledOnce).to.equal(true);
  });
});
