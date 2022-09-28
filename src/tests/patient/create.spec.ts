import mongoose from "mongoose"
import "dotenv/config"
import { PatientService } from "../../services"
import { Exception, TestHelpers } from "../../helpers"
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe("[CREATE PATIENT]", () => {
  it("CREATE PATIENT", async () => {
    try {
      const pat = await PatientService.register({
        user: String(await TestHelpers.getRandomUser()),
        psychologist: "6334a8667cdcde60fc4afacc",
      })
      expect(pat).toHaveProperty("_id")
    } catch (error: any) {
      expect(error).toBeInstanceOf(Exception.AppError)
    }
  })
})

afterAll(async () => await mongoose.disconnect())
