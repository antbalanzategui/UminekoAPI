const characterSchema = {
    id: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 63
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
      max: 63
    },
    idEnd: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 63
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
    trivia: {
      type: 'string',
      required: true,
      elementType: 'boolean',

    },
    relationships: {
      type: 'string',
      required: true,
      elementType: 'boolean',
    }

  };

    module.exports = {
    characterSchema,
    characterSchemaQuery,
    };
