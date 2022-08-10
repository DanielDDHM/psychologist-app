import mongoose from 'mongoose'
import 'dotenv/config';
import { PsyService, UsersService } from '../../services'
const {DATABASE_URL_TEST} = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

async function getRandomUser(){

    const {users} = await UsersService.get({})

    const user = users[Math.floor(Math.random() * 10) + 1]._id

    return user
}

jest.setTimeout(10000)
describe('[CREATE PSY]', () => {
    it('CREATE PSY', async () =>{
        const psy = await PsyService.register({user: String(await getRandomUser()), about: 'lorem ipsum'})
        expect(psy).toHaveProperty('_id')
    })
})