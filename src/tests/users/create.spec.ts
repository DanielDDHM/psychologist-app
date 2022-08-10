import mongoose from 'mongoose'
import 'dotenv/config';
import { UsersService } from '../../services'
const {DATABASE_URL_TEST} = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

function generateName(){
    var text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }   

  return text;
}

jest.setTimeout(10000)
describe('[CREATE USERS]', () => {
    it('CREATE USER', async () =>{
        const users = await UsersService.create({
            name: generateName(),
            email: `${generateName()}@teste.com.br`,
            password: generateName(),
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