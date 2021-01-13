const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are to returned as JSON and correct amount', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog document has property \'id\'', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach( blog => {expect(blog.id).toBeDefined()})
})
test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Bekar'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
      'async/await simplifies making async calls'
    )
  })

afterAll(() => {
  mongoose.connection.close()
})