import mongoose from 'mongoose'
import 'dotenv/config'
import { UsersService } from '../../services'
import { Exception, TestHelpers } from '../../helpers'
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe('[CREATE USERS]', () => {
  it('CREATE USER', async () => {
    const users = await UsersService.create({
      name: TestHelpers.generateName(),
      email: `${TestHelpers.generateName()}@teste.com.br`,
      password: TestHelpers.generateName(),
      photo: 'photo.png',
      phone: '719912341234',
      birthdate: '04/05/1997',
      address: {
        zipCode: '41310355',
        streetNumber: Math.floor(Math.random() * 10) + 1,
      },
    })
    expect(users).toHaveProperty('_id')
  })

  it('FAIL WITH EMAIL EXISTS', async () => {
    try {
      await UsersService.create({
        name: 'teste',
        email: `teste@teste.com.br`,
        password: TestHelpers.generateName(),
        photo: 'photo.png',
        phone: '719912341234',
        birthdate: '04/05/1997',
        address: {
          zipCode: '41310355',
          streetNumber: Math.floor(Math.random() * 10) + 1,
        },
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(Exception.AppError)
    }
  })
})

afterAll(async () => await mongoose.disconnect())
