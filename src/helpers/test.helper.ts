import { UsersService } from '../services'

export namespace TestHelpers {
  export const generateName = () => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }

  export async function getRandomUser() {
    const { users } = await UsersService.get({})

    const user = users[Math.floor(Math.random() * 10) + 1]._id

    return user
  }
}
