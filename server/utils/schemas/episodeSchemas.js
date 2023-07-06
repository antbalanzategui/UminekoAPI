const episodeSchema = {
    id: {
        min: 1,
        type: 'number',
        positive: true,
        integer: true,
        required: true,
        max: 8
    },
    type: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
  };

const episodeSchemaQuery = {
  idStart: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 8
  },
  idEnd: {
    min: 1,
    type: 'number',
    positive: true,
    integer: true,
    required: true,
    max: 8
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
    max: 8
  },
  soundtrack: {
    type: 'string',
    required: true,
    elementType: 'boolean',

  },
  images: {
    type: 'string',
    required: true,
    elementType: 'boolean',
  }
}

  module.exports = {
    episodeSchema,
    episodeSchemaQuery,
};
