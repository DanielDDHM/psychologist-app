import { UsersService } from '../src/services'
import { UsersTypes } from '../src/types'
export async function cb(module: string, operation: string, body: any, subbody?: any) {

  const ck = JSON.parse(body)
  const cl = JSON.parse(subbody)

  if (module === "USERS") {

    if (operation === "CREATE") {
      ck.address = { zipCode: cl.zipCode, streetNumber: Number(cl.streetNumber) }
      await UsersService.create(ck as UsersTypes.create)
    }

  }
}