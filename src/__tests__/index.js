import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import { Form, ValidatedCheckbox, ValidatedInput } from '../index';

describe('ValidatedCheckbox', () => {

  it('isChecked called', () => {
    const onSubmit = sinon.spy();
    const wrapper = mount(
      <Form
        onValidSubmit={onSubmit}
        validationEvent='onBlur'>
        <ValidatedCheckbox
          name='agree'
          validate='isChecked' >
          I agree
        </ValidatedCheckbox>
      </Form>
    );

    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.has-error')).to.have.length(1);
  });
});

describe('ValidatedInput', () => {

  it('required called', () => {
    const onSubmit = sinon.spy();
    const onChange = sinon.spy();
    const wrapper = mount(
      <Form
        onValidSubmit={onSubmit}
        validationEvent='onBlur'>
        <ValidatedInput
          name="password"
          type="password"
          value=''
          onChange={onChange}
          label="Your personal password"
          validate='required,isLength:6:60'
          errorHelp={{
            required: 'Please specify a password',
            isLength: 'Password must be at least 6 characters'
          }} />
      </Form>
    );

    wrapper.find('form').simulate('submit');
    wrapper.find('input').simulate('change', {target: {value: 'password'}});
    expect(onChange.calledOnce).to.equal(true);
    expect(onSubmit.callCount).to.equal(0);
    expect(wrapper.find('.help-block')).to.have.text('Please specify a password');
    expect(wrapper.find('.has-error')).to.have.length(1);
  });

  it('isLength called', () => {
    const onSubmit = sinon.spy();
    const onChange = sinon.spy();
    const wrapper = mount(
      <Form
        onValidSubmit={onSubmit}
        validationEvent='onBlur'>
        <ValidatedInput
          name="password"
          type="password"
          value='blah'
          onChange={onChange}
          label="Your personal password"
          validate='required,isLength:6:60'
          errorHelp={{
            required: 'Please specify a password',
            isLength: 'Password must be at least 6 characters'
          }} />
      </Form>
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit.callCount).to.equal(0);
    expect(wrapper.find('.help-block')).to.have.text('Password must be at least 6 characters');
    expect(wrapper.find('.has-error')).to.have.length(1);
  });

  it('submit called', () => {
    const onSubmit = sinon.spy();
    const onChange = sinon.spy();
    const wrapper = mount(
      <Form
        onValidSubmit={onSubmit}
        validationEvent='onBlur'>
        <ValidatedInput
          name="password"
          type="password"
          value='password'
          onChange={onChange}
          label="Your personal password"
          validate='required,isLength:6:60'
          errorHelp={{
            required: 'Please specify a password',
            isLength: 'Password must be at least 6 characters'
          }} />
      </Form>
    );

    wrapper.find('form').simulate('submit');
    expect(onSubmit.calledOnce).to.equal(true);
    expect(wrapper.find('.has-error')).to.have.length(0);
  });
});
