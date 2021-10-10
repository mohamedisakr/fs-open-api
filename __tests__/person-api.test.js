const api = require('../utils/common')
const config = require('../utils/config')

describe('endpoint', () => {
  test('should get persons info - # of persons', async () => {
    await api.get(config.INFO_URL).expect(200)
  })

  test('should get all persons', async () => {
    await api.get(config.PERSON_URL).expect(200)
    //   .expect('Content-Type', /application\/json/)
  })
})
