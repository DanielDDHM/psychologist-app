import mongoose from "mongoose"
import "dotenv/config"
import { UsersService } from "../../services"
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe("[GET USERS]", () => {
  it("GET ALL USERS", async () => {
    const users = await UsersService.get({})
    expect(users).toHaveProperty("users")
  })

  it("GET BY ID", async () => {
    const users = await UsersService.get({ id: "6334a703f82e05d938b1daf1" })
    expect(users).toHaveProperty("users")
  })
})

afterAll(async () => {
  mongoose.disconnect()
})
