const Blog = require('../blog')
const {Schema} = require('mongoose')

describe('Blog model', () => {
  describe('schema', () => {
    test('title', () => {
      const title = Blog.schema.obj.title
      expect(title).toEqual({type: String, required: true})
    })

    test('url', () => {
      const url = Blog.schema.obj.url
      expect(url).toEqual({type: String, required: true})
    })

    test('likes', () => {
      const likes = Blog.schema.obj.likes
      expect(likes).toEqual({type: Number, default: 0})
    })

    test('user', () => {
      const user = Blog.schema.obj.user
      expect(user).toEqual({
        type: Schema.Types.ObjectId,
        ref: 'User',
      })
    })
  })
})
