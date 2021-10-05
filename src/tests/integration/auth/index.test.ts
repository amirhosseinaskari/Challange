import {Server} from 'http'
import {REGISTER_USER} from 'endpoints/auth'
import request from 'supertest'
let test_server: Server
describe('api/users/', () => {
  beforeEach(async () => {
    const {server} = await import('~src/server')
    test_server = server
  })

  afterEach(() => {
    test_server && test_server.close()
  })

  describe('POST: /register - bad request', () => {
    it('should return bad request (phone number and password is required)', async () => {
      const res = await request(test_server).post(`${REGISTER_USER}/register`)
      expect(res.status).toBe(400)
    })
  })

  describe('POST: /register - OK response', () => {
    it('should return 200', async () => {
      const res = await request(test_server).post(`${REGISTER_USER}/register`)
      expect(res.status).toBe(200)
    })
  })
})
