import validator from 'validator';

/**
* Returns true if the value is not empty
*
* @params {String} val
* @returns {Boolean}
*/
validator['required'] = function required(val) {
  if (val && typeof(val) === 'string') {
    return !validator.isEmpty(val);
  }
  return false;
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
