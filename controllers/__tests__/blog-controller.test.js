const controllers = require('../blog')
const {isFunction} = require('lodash')

describe('blog controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne',
    ]

    crudMethods.forEach((name) =>
      expect(isFunction(controllers[name])).toBe(true),
    )
  })
})
