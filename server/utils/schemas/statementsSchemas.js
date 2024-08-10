const statementsSchema = {
    id: {
        min: 1,
        type: 'number',
        positive: true,
        integer: true,
        required: true,
        max: 2578
    },
    type: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
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

const statementsSchemaQuery = {
  idStart: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 2578
  },
  idEnd: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 2578
  },
  type: {
    type: 'string',
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  episodeStart: {
    type: 'number',
    integer: true,
    min: 1,
    max: 8,
    required: true,
  },
  episodeEnd: {
    type: 'number',
    integer: true,
    min: 1,
    max: 8,
    required: true,
  },
  random: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 2578
  }
}

  module.exports = {
    statementsSchema,
    statementsSchemaQuery,
};
