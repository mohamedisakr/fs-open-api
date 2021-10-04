const {dummy, countTotalLikes} = require('../utils/list-helper')
const {listWithOneBlog, blogs} = require('../fixtures/blogs.data')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = countTotalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list is empty, equals 0', () => {
    const emptyBlogs = []
    const result = countTotalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('when large list, get the right totals', () => {
    const result = countTotalLikes(blogs)
    expect(result).toBe(36)
  })
})
