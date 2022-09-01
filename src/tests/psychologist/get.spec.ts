import mongoose from "mongoose"
import "dotenv/config"
import { PsyService } from "../../services"
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe("[GET PSY]", () => {
  it("GET ALL PSY", async () => {
    const psy = await PsyService.get({})
    expect(psy).toHaveProperty("psychologists")
  })

  it("GET BY ID", async () => {
    const psy = await PsyService.get({ id: "62f4378e3453db77afc332b1" })
    expect(psy).toHaveProperty("psychologists")
  })
})

afterAll(async () => await mongoose.disconnect())
