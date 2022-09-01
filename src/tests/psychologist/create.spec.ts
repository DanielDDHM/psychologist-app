import mongoose from "mongoose"
import "dotenv/config"
import { PsyService } from "../../services"
import { Exception, TestHelpers } from "../../helpers"
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe("[CREATE PSY]", () => {
  it("CREATE PSY", async () => {
    try {
      const psy = await PsyService.register({
        user: String(await TestHelpers.getRandomUser()),
        about: "lorem ipsum",
      })
      expect(psy).toHaveProperty("_id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Exception.AppError)
    }
  })
})

afterAll(async () => await mongoose.disconnect())
