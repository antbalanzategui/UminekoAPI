// Function to check whether the attributes of parameters within a request 
// match its designated schema's rules...
function validateQuery(query, querySchema) {
  const errors = [];
  const allowedParams = Object.keys(querySchema);

  for (const param in query) {
    if (!allowedParams.includes(param)) {
      errors.push(`Invalid parameter: ${param}`);
    }
  }

  for (const [param, rules] of Object.entries(querySchema)) {
    // Check if parameter is present in query string
    if (!(param in query)) {
      continue;
    }

    if (Array.isArray(query[param]) && rules.type !== 'array') {
      errors.push(`${param} cannot have duplicates`);
      continue
    }

    // Check if parameter is required and missing
    if (rules.required && (query[param] === undefined || query[param] === '')) {
      errors.push(`${param} is required`);
      continue;
    }

    // Handle array type separately
    if (rules.type === 'array') {
      const value = query[param];

      // Check if parameter is present and is an array
      if (!Array.isArray(value)) {
        errors.push(`${param} must be an array`);
        continue;
      }

      // Check array length if specified
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        errors.push(`${param} must have at least ${rules.minLength} elements`);
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        errors.push(`${param} must have at most ${rules.maxLength} elements`);
      }

      // Validate individual elements of the array if additional rules exist
      if (rules.type == 'array' && rules.elementType) {
        const elementType = rules.elementType;
        for (const element of value) {
          if (rules.elementType === 'string' && !/^[A-Za-z]+$/.test(element)) {
            errors.push(`${param} elements must be of type ${elementType}`);
          }
          if (element.length < rules.elementMinLength) {
            errors.push(`${param} elements must be of size ${rules.elementMinLength}`)
          }
        }
      }
      continue;
    }

    if (rules.type == 'string' && rules.elementType == 'boolean') {
      let lowerCaseParam = query[param].toLowerCase();
      query[param] = lowerCaseParam;
      if (query[param] !== 'true' && query[param] !== 'false') {
        errors.push(`${param} elements must have value of 'true' or 'false'`)
      }
    }

    // Check if parameter is present and has the correct type
    if (query[param] !== undefined && typeof query[param] !== rules.type && rules.type != undefined) {
      errors.push(`${param} must be of type ${rules.type}`);
      continue;
    }

    // Check if parameter is a number and meets numeric rules
    if (typeof query[param] === 'number') {
      if (rules.integer && !Number.isInteger(query[param])) {
        errors.push(`${param} must be an integer`);
      }
      else if (rules.positive && query[param] < 0) {
        errors.push(`${param} must be greater than zero`);
      }
      else if (rules.min !== undefined && query[param] < rules.min) {
        errors.push(`${param} must be greater than or equal to ${rules.min}`);
      }
      else if (rules.max !== undefined && query[param] > rules.max) {
        errors.push(`${param} must be less than or equal to ${rules.max}`);
      }
      if (param === 'idStart' && query['idEnd'] !== undefined && query[param] > query['idEnd']) {
        errors.push(`idStart cannot be greater than idEnd`);
      } else if (param === 'idEnd' && query['idStart'] !== undefined && query[param] < query['idStart']) {
        errors.push(`idEnd cannot be less than idStart`);
      }
      if (param === 'birthMonthStart' && query['birthMonthEnd'] !== undefined && query[param] > query['birthMonthEnd']) {
        errors.push(`birthMonthStart cannot be greater than birthMonthEnd`);
      } else if (param === 'birthMonthEnd' && query['birthMonthStart'] !== undefined && query[param] < query['birthMonthStart']) {
        errors.push(`birthMonthEnd cannot be less than birthMonthStart`);
      }
      if (param === 'episodeStart' && query['episodeEnd'] !== undefined && query[param] > query['episodeEnd']) {
        errors.push(`episodeStart cannot be greater than episodeEnd`);
      } else if (param === 'episodeEnd' && query['episodeStart'] !== undefined && query[param] < query['episodeStart']) {
        errors.push(`episodeEnd cannot be less than episodeStart`);
      }
    }
    // Check if parameter is a string and meets string rules
    else if (typeof query[param] === 'string') {
      if (rules.minLength !== undefined && query[param].length < rules.minLength) {
        errors.push(`${param} must have at least ${rules.minLength} characters`);
      }
      if (rules.maxLength !== undefined && query[param].length > rules.maxLength) {
        errors.push(`${param} must have at most ${rules.maxLength} characters`);
      }
      if (!/^[A-Za-z]+$/.test(query[param])) {
        errors.push(`${param} must contain only alphabetic characters`);
      }
    }
  }
  return errors;
}

module.exports = {
  validateQuery,
};
