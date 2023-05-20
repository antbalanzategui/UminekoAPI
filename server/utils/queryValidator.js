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
  for (const [param, rules] of Object.entries(querySchema)) {
    // Check if parameter is present in query string
    if (!(param in query)) {
      continue;
    }

    // Check if parameter is required and missing
    if (rules.required && (query[param] === undefined || query[param] === '')) {
      console.log(query[param])
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
    soundTrackSchema
  };
