const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Bekar',
    url: 'Some url',
    likes: 10
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Bekar',
    url: 'Some url',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogInDb = async (id) => {
  const blog = await Blog.findById(id)
  return blog.toJSON()
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, blogInDb
}