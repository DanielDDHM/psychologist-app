import mongoose from 'mongoose'
import 'dotenv/config';
import {UsersService} from '../../services'
import { TestHelpers} from '../../helpers';
const {DATABASE_URL_TEST} = process.env


beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe('[UPDATE USERS]', () => {

    it('SUCCESS', async () =>{
        const users = await UsersService.update({
            id: String(await TestHelpers.getRandomUser()),
            name: TestHelpers.generateName(),
            email: `${TestHelpers.generateName()}@teste.com.br`,
            password: TestHelpers.generateName(),
            photo: "photo.png",
            phone: "719912341234",
            birthdate: "04/05/1997",
            address:{
            zipCode: "41310355",
            streetNumber: Math.floor(Math.random() * 100) + 1,
            }
        })
        expect(users).toHaveProperty('_id')
    })
})

afterAll(async () => {
    mongoose.disconnect()
})