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

// helpers
const reducer = (sum, blog) => sum + blog.likes

module.exports = {dummy, countTotalLikes}
