import superTest from 'supertest'
import { app } from '~src/server'
import { createServer, Server } from 'http'
import supertest from 'supertest'
import { User } from '~src/models/user'
import { t } from '~src/subscribers/i18next'
import { LOGIN, REGISTER } from '~src/endpoints/auth'

const initial_user = { name: 'amir', phone: '09124690677', password: '123456' }
describe('Authentication Test', () => {
  let server: Server
  beforeEach(() => {
    server = !server ? createServer(app) : server
  })

  afterEach(async () => {
    server.close()
    User.deleteMany({}, () => {})
  })

  const addUser = async (
    props:
      | {
          name: string
          password: string
          phone: string
        }
      | undefined = { ...initial_user }
  ) => {
    const req = supertest(server)
    const res = await req.post(REGISTER).send(props)

    return res
  }

  it('Should be 200 - Successful Registration ', async () => {
    const res = await addUser()
    expect(res.status).toBe(200)
    expect(res.error).toBeFalsy()
  })

  it('Should be 400 - User already registered', async () => {
    const res_first = await addUser()
    const res_second = await addUser()

    expect(res_second.status).toBe(400)
    expect(res_second.body).toMatchObject({
      message: t('errors:auth.user_registered'),
    })
  })

  it('Should be Login with phone', async () => {
    const add_new_user = await addUser()
    if (add_new_user.status !== 200) return
    const { id } = add_new_user.body

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { phoneVerified: true } },
      { new: true }
    )

    // login
    const req = superTest(server)
    const res = await req.post(LOGIN).send({ ...initial_user, name: null })

    expect(res.status).toBe(200)
  })
})
