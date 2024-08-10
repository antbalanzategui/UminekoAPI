const imageSchemaQuery = {
    idStart: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 208
    },
    idEnd: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 208
    },
    characters: {
      type: 'array',
      minLength: 1,
      maxLength: 50,
      elementType: 'string',
      elementMinLength: 3,
      elementMaxLength: 10,
      required: true,
    },    
    type: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
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
      max: 208
    }
  };
  const imageSchema = {
    id: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 58
    },
    characters: {
      type: 'array',
      minLength: 1,
      maxLength: 50,
      elementType: 'string',
      required: true,
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

  module.exports = {
    imageSchema,
    imageSchemaQuery,
    };
