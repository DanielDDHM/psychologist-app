import mongoose from "mongoose"
import "dotenv/config"
import { PatientService } from "../../services"
const { DATABASE_URL_TEST } = process.env

beforeAll(async () => await mongoose.connect(String(DATABASE_URL_TEST)))

jest.setTimeout(10000)
describe("[GET PATIENT]", () => {
  it("GET ALL PATIENT", async () => {
    const pat = await PatientService.get({})
    expect(pat).toHaveProperty("patients")
  })

  it("GET BY ID", async () => {
    const pat = await PatientService.get({ id: "6334a9939b573e6914bc19b0" })
    expect(pat).toHaveProperty("patients")
  })
})

afterAll(async () => await mongoose.disconnect())
