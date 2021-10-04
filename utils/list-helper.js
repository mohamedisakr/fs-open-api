const dummy = (blogs) => {
  return 1
}

/**
 * returns the total sum of likes in all of the blog posts.
 * @param {*} blogs a list of blog posts
 * @returns
 */
const countTotalLikes = (blogs) => {
  const total = blogs.reduce(reducer, 0)
  return total
}

/**
 * finds out which blog has most likes.
 * If there are many top favorites, it is enough to return one of them.
 * @param {*} blogs a list of blogs
 * @returns
 */
const getFavoriteBlog = (blogs) => {
  let favoriteBlog = {}
  let mostLikes = 0
  blogs.forEach(({title, author, likes}) => {
    if (likes > mostLikes) {
      mostLikes = likes
      favoriteBlog = {title, author, likes: mostLikes}
    }
  })
  return favoriteBlog
}

/**
 * returns the author who has the largest amount of blogs.
 * The return value also contains the number of blogs the top author has
 *
 * @param {*} list an array of blogs
 */
const getMostBlogs = (list) => {
  const authors = list.map(({author}) => author)
  return getAuthorWithMaxBlogs(authors)
}

/**
 * returns the author, whose blog posts have the largest amount of likes.
 * The return value also contains the total number of likes that the
 * author has received
 * @param {*} blogs  an array of blogs
 * @returns
 */
const getMostLikes = (blogs) => {
  const groups = groupBy(blogs)
  let mostLikes = getAuthorMostLikes(groups)
  return mostLikes
}

const getAuthorMostLikes = (blogs) => {
  let maxLikes = 0
  let theBlog = {}
  blogs.forEach(({author, likes}) => {
    if (likes > maxLikes) {
      maxLikes = likes
      theBlog = {author, likes: maxLikes}
    }
  })
  return theBlog
}

// helpers
const reducer = (sum, blog) => sum + blog.likes

const groupBy = (blogs) => {
  var result = []

  const reducer = (res, blog) => {
    if (!res[blog.author]) {
      res[blog.author] = {author: blog.author, likes: 0}
      result.push(res[blog.author])
    }
    res[blog.author].likes += blog.likes
    return res
  }

  blogs.reduce(reducer, {})
  return result
}

const groupByAuthorAndBlog = (blogs) => {
  var result = []

  const reducer = (res, blog) => {
    if (!res[blog.author]) {
      res[blog.author] = {author: blog.author, blogs: 0}
      result.push(res[blog.author])
    }
    res[blog.author].blogs += 1
    return res
  }

  blogs.reduce(reducer, {})
  return result
}

const getAuthorWithMaxBlogs = (authors) => {
  let maxCount = 0
  let author = null
  const occurrences = new Map()
  authors.forEach((item) => {
    const count = occurrences.has(item) ? occurrences.get(item) + 1 : 1
    occurrences.set(item, count)
    maxCount = count > maxCount ? count : maxCount
    author = item
  })

  return {author, blogs: maxCount}
}

module.exports = {
  dummy,
  countTotalLikes,
  getFavoriteBlog,
  getMostBlogs,
  getMostLikes,
}
