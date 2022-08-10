import { Router } from "express";

import authRoutes from './auth.routes'
import callRoutes from './call.routes'
import chatRoutes from './chat.routes'
import consultRoutes from './consults.routes'
import diagnosticRoutes from './diagnostics.routes'
import usersRoutes from './users.routes'
import psyRoutes from './psychologist.routes'
import patRoutes from './patient.routes'

const routes = Router();

routes
  .use('/auth', authRoutes)
  .use('/call', callRoutes)
  .use('/chat', chatRoutes)
  .use('/consult', consultRoutes)
  .use('/diagnostics', diagnosticRoutes)
  .use('/users', usersRoutes)
  .use('/psy', psyRoutes)
  .use('/pat', patRoutes)

export default routes