# Form validation for [react-bootstrap](http://react-bootstrap.github.io/).

## Example 1: Simple Registration Form

```js
import React from 'react';
import { ButtonInput } from 'react-bootstrap';
import {
  Form,
  ValidatedInput,
  validatedRadio,
  RadioGroup,
  ValidatedCheckbox } from 'react-bootstrap-validation';

class MyRegistrationForm extends React.Component {

    ...

    render() {
        return (
            <Form onValidSubmit={this._handleValidSubmit.bind(this)}>

                <ValidatedInput
                    type='text'
                    label='Email'
                    // Each input that you need validated should have
                    // the "name" prop
                    name='email'
                    // Validation rules separated with comma
                    validate='required,isEmail'
                    // Error messages for each error type
                    errorHelp={{
                        required: 'Please enter your email',
                        isEmail: 'Email is invalid'
                    }} />

                <ValidatedInput
                    type='password'
                    name='password'
                    label='Password'
                    // You can pass params to validation rules
                    validate='required,isLength:6:60'
                    errorHelp={{
                        required: 'Please specify a password',
                        isLength: 'Password must be at least 6 characters'
                    }} />

                <ValidatedInput
                    type='password'
                    name='password-confirm'
                    label='Confirm Password'
                    // Validate can be a function as well
                    validate={(val, context) => val === context.password}
                    // If errorHelp property is a string, then it is used
                    // for all possible validation errors
                    errorHelp='Passwords do not match' />

                <RadioGroup
                    name='radio'
                    value='3'
                    label='Which one is better?'
                    // Supports validation as well
                    validate={v => v === 'cola'}
                    errorHelp='Pepsi? Seriously?'
                    // And accepts (almost) all the same props
                    // as other react-bootstrap components
                    labelClassName='col-xs-2'
                    wrapperClassName='col-xs-10'>
                    <ValidatedRadio value='cola' label='Cola' />
                    <ValidatedRadio value='pepsi' label='Pepsi' />
                </RadioGroup>

                <ValidatedCheckbox
                    name='agree'
                    label='I agree to the terms and conditions'
                    // Validation rules is easily extendable to fit
                    // your needs. There are only two custom rules,
                    // 'isChecked' and 'required', others are stock
                    // validator.js methods
                    validate='isChecked' />

                <ButtonInput
                    type='submit'
                    bsSize='large'
                    bsStyle='primary'
                    value='Register' />
            </Form>
        );
    }

    _handleValidSubmit(values) {
        // Values is an object containing all values
        // from the inputs
    }

    ...

}
```

## Components

### `Form`

Form is a wrapper around all the inputs.

**Properties**

##### `onValidSubmit: Function` **required**
Callback that receives `values` object, which is a hash map of `inputName => inputValue`.

```js
<Form onValidSubmit={values => alert(`Hello ${values.name}!`)}>
    <ValidatedInput name="name" />

    ...

</Form>
```

##### `errorHelp: String|Object`
When validation error is triggered and there's no `errorHelp` property specified for the validated input, the error text is looked up in form's `errorHelp` property.

##### `validationEvent: String`
Input event that triggers field validation. Can be one of `onChange`, `onBlur` or `onFocus`. Default value is `onChange`.

### `ValidatedInput`

An extension of react-bootstrap's `Input` component. Should be used instead of the original one for all the fields that need to be validated. All `ValidatedInput`s should have `name` property defined.

**Properties**

##### `name: String` **required**
This property is inherited from `Input` with only difference that it is required for `ValidatedInput`.

##### `validationEvent: String`
Event that triggers validation. Can be one of `onChange`, `onBlur` or `onFocus`. Default value is `onChange`. Overrides Form's `validationEvent` property.

```js
<ValidatedInput
    name='email'
    validationEvent='onBlur'
    validate='required,isEmail'
/>
```

##### `validate: Function|String`
Either a validation function or a string validation rule.

Validation function receives two arguments, `val` and `context`. First one is the value of the input, second one is an object, containing values of all form fields. Having context is useful if you have a field, whose validation depends on other values of the form.
```js
<ValidatedInput
    name='passwordConfirm'
    validate={(val, context) => {
        return val === context.password;
    }}
/>
```
The result of the function should be either a boolean or a string. Any value returned that `!== true` is considered an error. If string is returned, it is used as an `errorHelp` property to render the error.

Validation rule is a combination of validator.js method names separated with comma.
```js
<ValidatedInput
    name='email'
    validate='required,isEmail,isLength:5:60'
/>
```
In the example above, input's value will be validated with three methods. `isLength` method also receives additional params. Inverse rules (like `!isNull`) are supported, although in `errorHelp` object they're looked up without the exclamation mark.

##### `errorHelp: Object|String`
Can be either a string with error text or an object with map `ruleName => errorText`.
```js
<ValidatedInput
    name="email"
    validate='required,isEmail',
    errorHelp={{
        required: 'Please enter your email',
        isEmail: 'Invalid email'
    }}
/>
```
If `errorHelp` property is omitted, default messages are looked up from `errorHelp` property of `Form` element.

### `Radio`
`Radio` component is basically the same as `ValidatedInput`, except it can not be validated. Validation is performed in the `RadioGroup`.

### `RadioGroup`
Wrapper component for `Radio` elements that performs validation and easy default value setup.

**Properties**

Following properties are inherited from original react-bootstrap `Input`:

`standalone, hasFeedback, bsSize, bsStyle, groupClassName, wrapperClassName, labelClassName`

And the next ones are from `ValidatedInput`:

`validate, errorHelp`

```js
<RadioGroup
    name='radio'
    // Set the initial value
    value='1'
    label='Some random options'
    labelClassName='col-xs-2'
    wrapperClassName='col-xs-10'>
    <Radio value='1' label='Option 1' />
    <Radio value='2' label='Option 2' />
    <Radio value='3' label='Option 3' />
</RadioGroup>
```

##### `validationEvent: String`
This property is a slightly different from `ValidatedInput`s one - it only accepts `onChange` (which is also it's default value) and should not be used.

## Validators

### `Validator`

A [validator.js](https://github.com/chriso/validator.js) object extended with the following custom validation methods:

##### `Validator.required(val: String)`
Returns `true` if the value is not null. Can be used as an alias to `!isNull` validation rule.

##### `Validator.isChecked(val: String)`
Used only for checkboxes as their value is return as `boolean` by the `Form` component. Returns `true` if the value equals to `'true'`. This is because all the values coming to validator.js methods are [treated as strings](https://github.com/chriso/validator.js#strings-only).

Refer to validator.js documentation for more information on it's validation methods and how to [extend it](https://github.com/chriso/validator.js#extensions).
