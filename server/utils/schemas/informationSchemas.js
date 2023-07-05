const informationSchema = {
    id: {
        min: 1,
        type: 'number',
        positive: true,
        integer: true,
        required: true,
        max: 50
    },
    name: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        required: true,
    },
    type: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
  };

const informationSchemaQuery = {
  idStart: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 50
  },
  idEnd: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 50
  },
  name: {
    type: 'string',
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  type: {
    type: 'string',
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  random: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 50
  }
}

  module.exports = {
    informationSchema,
    informationSchemaQuery,
};
