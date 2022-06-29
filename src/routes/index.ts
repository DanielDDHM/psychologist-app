import { Router } from "express";

import authRoutes from './auth.route'
import callRoutes from './call.routes'
import chatRoutes from './chat.route'
import consultRoutes from './consults.route'
import diagnosticRoutes from './diagnostics.route'
import psychologistRoutes from './psychologists.route'
import staffRoutes from './staff.route'
import usersRoutes from './users.routes'

const routes = Router();

routes
  .use('/auth', authRoutes)
  .use('/call', callRoutes)
  .use('/chat', chatRoutes)
  .use('/consult', consultRoutes)
  .use('psychologist', psychologistRoutes)
  .use('/diagnostics', diagnosticRoutes)
  .use('/staff', staffRoutes)
  .use('/users', usersRoutes)

export default routes