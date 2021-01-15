const router = require('express').Router()
const Blog = require('../models/blog')


router.get('/', async (request, response) => {
  await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  await blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = router