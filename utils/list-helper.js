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

// helpers
const reducer = (sum, blog) => sum + blog.likes

module.exports = {dummy, countTotalLikes, getFavoriteBlog}
