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
router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
router.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {likes: body.likes}
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog.toJSON())
})

module.exports = router