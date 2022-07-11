import 'dotenv/config';
import mongoose from 'mongoose';
import { UsersService } from '../src/services'
import { UsersTypes } from '../src/types'

export async function cb(module: string, operation: string, body?: any, subbody?: any) {
  const ck = body ? JSON.parse(body) : {}
  const cl = subbody ? JSON.parse(subbody) : {}
  const { DATABASE_URL } = process.env

  mongoose.connect(DATABASE_URL!)
    .then(() => {
      console.log(`APP DB: ${DATABASE_URL}`)
    })
    .catch(e => console.error('COULD NOT CONNECT ON DB', e))

  if (module === "USERS") {

    if (operation === "GET") {
      ck.page = cl.page ? Number(cl.page) : 1
      ck.perPage = cl.perPage ? Number(cl.page) : 10
      try {
        const users = await UsersService.get(ck as UsersTypes.get)
        console.log("FINISHED", users)
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "CREATE") {
      try {
        ck.address = { zipCode: cl.zipCode, streetNumber: Number(cl.streetNumber) }
        const userCreated = await UsersService.create(ck as UsersTypes.create)
        console.log("FINISHED", { userCreated })
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "UPDATE") {
      try {
        ck.address = { zipCode: cl.zipCode, streetNumber: Number(cl.streetNumber) }
        const userUpdated = await UsersService.update(ck as UsersTypes.update)
        console.log("FINISHED", { userUpdated })
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "DELETE") {
      try {
        const userDeleted = await UsersService.destroy(ck as UsersTypes.idOnly)
        console.log("FINISHED", { userDeleted })
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "CONFIRM") {
      try {
        const userConfirmed = await UsersService.confirm(ck as UsersTypes.idOnly)
        console.log("FINISHED", { userConfirmed })
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "ACTIVE") {
      try {
        const userActivated = await UsersService.activate(ck as UsersTypes.idOnly)
        console.log("FINISHED", { userActivated })
      } catch (error) {
        console.log({ error })
      }
    }

    if (operation === "ADMIN") {
      try {
        const userAdminified = await UsersService.adminify(ck as UsersTypes.idOnly)
        console.log("FINISHED", { userAdminified })
      } catch (error) {
        console.log({ error })
      }
    }
  }

  if (module === "") {
    console.log("")
  }
}