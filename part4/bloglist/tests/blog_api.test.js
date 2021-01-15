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
      author: 'Bekar',
      url: 'some url'
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
  test('if \'likes\' property is missing it should default with zero', async () => {
    const blogObj = {
        title:'asdf',
        author: 'asdf',
        url: 'asdf'
    }
    await api
      .post('/api/blogs')
      .send(blogObj)
      .expect(201)
      .then(res => {
        expect(res.body.likes === 0)
      })
  })
  test('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

afterAll(() => {
  mongoose.connection.close()
})