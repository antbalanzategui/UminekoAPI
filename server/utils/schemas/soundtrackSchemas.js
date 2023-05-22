const soundTrackSchemaQuery = {
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
    }
  };
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

  module.exports = {
    soundTrackSchema,
    soundTrackSchemaQuery,
    };
