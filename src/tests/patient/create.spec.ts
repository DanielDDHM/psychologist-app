import mongoose from 'mongoose'
import 'dotenv/config';
import { PatientService, UsersService } from '../../services'
const {DATABASE_URL_TEST} = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

async function getRandomUser(){

  const {users} = await UsersService.get({})

  const user = users[Math.floor(Math.random() * 10) + 1]._id

  return user
}

jest.setTimeout(10000)
describe('[CREATE PATIENT]', () => {
    it('CREATE PATIENT', async () =>{
        const pat = await PatientService.register({
          user: String(await getRandomUser()),
          psychologist: '62f4378e3453db77afc332b1'
        }) 
        expect(pat).toHaveProperty('_id')
    })
})