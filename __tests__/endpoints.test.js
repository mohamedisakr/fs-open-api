const api = require('../utils/common')
const config = require('../utils/config')

describe.skip('app endpoints', () => {
  test('home url', async () => {
    await api
      .get('/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog url', async () => {
    await api.get(config.BLOG_URL).expect(200)
  })

  test('login url', async () => {
    await api.post(config.LOGIN_URL).expect(401)
  })

  test('note url', async () => {
    await api.get(config.NOTE_URL).expect(200)
  })

  test('person url', async () => {
    await api.get(config.PERSON_URL).expect(200)
  })

  test('user url', async () => {
    await api.get(config.USER_URL).expect(200)
  })

  test('info url', async () => {
    await api.get(config.INFO_URL).expect(200)
  })
})
