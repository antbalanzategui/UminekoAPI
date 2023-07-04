const relationsSchema = {
    id: {
        min: 1,
        type: 'number',
        positive: true,
        integer: true,
        required: true,
        max: 513
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

  const relationsSchemaQuery = {
    idStart: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 513
    },
    idEnd: {
      min: 1,
      type: 'number',
      positive: true,
      integer: true,
      required: true,
      max: 513
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
      max: 513
    }
  }



  module.exports = {
    relationsSchema,
    relationsSchemaQuery
};
