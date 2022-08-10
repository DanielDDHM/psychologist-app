import mongoose from 'mongoose'
import 'dotenv/config';
import { PsyService } from '../../services';
const {DATABASE_URL_TEST} = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe('[GET PSY]', () => {
    it('GET ALL USERS', async () =>{
        const users = await PsyService.get({})
        expect(users).toHaveProperty('psychologists')
    })

    it('GET BY ID', async () =>{
        const users = await PsyService.get({id: '62f4378e3453db77afc332b1'})
        expect(users).toHaveProperty('psychologists')
    })
})