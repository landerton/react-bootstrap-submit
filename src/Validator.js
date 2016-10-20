import validator from 'validator';

/**
* Returns true if the value is not empty
*
* @params {String} val
* @returns {Boolean}
*/
validator['required'] = function required(val) {
  return !validator.isEmpty(val);
}

/**
* Returns true if the value is boolean true
*
* @params {String} val
* @returns {Boolean}
*/
validator['isChecked'] =  function isChecked(val) {
  return val;
}

export default validator;
