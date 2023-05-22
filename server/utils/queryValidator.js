// This is the querySchema for the Characters, essentially specifies 
// particular attributes for each parameter within a schema,
// this is then used to measure a parameter's validity within the
// validateQuery function below

const characterSchema = {
  id: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 46
  },
  name: {
    type: 'string',
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  gender: {
    type: 'string',
    minLength: 2,
    maxLength: 6,
    required: true,
  },
  birthMonth: {
    type: 'number',
    integer: true,
    min: 1,
    max: 12,
    required: true,
  },
};
const characterSchemaQuery = {
  idStart: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 46
  },
  idEnd: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 46
  },
  name: {
    type: 'string',
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  gender: {
    type: 'string',
    minLength: 2,
    maxLength: 6,
    required: true,
  },
  birthMonthStart: {
    type: 'number',
    integer: true,
    min: 1,
    max: 12,
    required: true,
  },
  birthMonthEnd: {
    type: 'number',
    integer: true,
    min: 1,
    max: 12,
    required: true,
  },
};
// This is the querySchema for the SoundTrack query
const soundTrackSchema = {
  id: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 208
  },
  title: {
    type: 'string',
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  composer: {
    type: 'string',
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  episode: {
    type: 'number',
    integer: true,
    min: 1,
    max: 8,
    required: true,
  },
};
// Function to check whether the attributes of parameters within a request 
// match it's designated schema's rules...
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

    // Check if parameter is required and missing
    if (rules.required && (query[param] === undefined || query[param] === '')) {
      errors.push(`${param} is required`);
      continue;
    }

    // Check if parameter is present and has the correct type
    if (query[param] !== undefined && typeof query[param] !== rules.type) {
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
    characterSchema,
    soundTrackSchema,
    characterSchemaQuery,
  };
