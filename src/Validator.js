import validator from 'validator';

/**
* Returns true if the value is not empty
*
* @params val
* @returns {Boolean}
*/
validator['required'] = function required(val) {
  if (val) {
    return true;
  } else {
    return false;
  }
}

/**
* Returns true if the value is not empty
*
* @params val
* @returns {Boolean}
*/
validator['isChecked'] =  function isChecked(val) {
  if (val) {
    return true;
  } else {
    return false;
  }
}

export default validator;
