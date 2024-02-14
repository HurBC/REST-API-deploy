const z = require('zod')

const movieScheme = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(5).default(0),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-fi', 'Crime']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum genres'
    }
  )
})

function validateMovie(object) {
  return movieScheme.safeParse(object)
}

function validatePartialMovie(object) {
  return movieScheme.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
