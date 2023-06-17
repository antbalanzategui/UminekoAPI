const triviaSchema = {
    id: {
        min: 1,
        type: 'number',
        positive: true,
        integer: true,
        required: true,
        max: 147
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

const triviaSchemaQuery = {
  idStart: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 147
  },
  idEnd: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 147
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
    max: 147
  }
}

  module.exports = {
    triviaSchema,
    triviaSchemaQuery,
};
