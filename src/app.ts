import "express-async-errors"
import "dotenv/config"
import mongoose from "mongoose"
import routes from "./routes"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import express, { Request, Response } from "express"
const { PORT, DATABASE_URL } = process.env
import { Documentation } from "./docs/api"
import { createServer } from "http"
import * as WebSocket from "socket.io"

//APP
const app = express()

// Express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/v1", routes)

// one call for test
app.get("/", (req: Request, res: Response) => {
  return res.send({ status: "UP" })
})
// DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(Documentation.Api))

export const start = async () => {
  await mongoose
    .connect(String(DATABASE_URL)!)
    .then(() => {
      console.log(`APP DB CONECTED: ${DATABASE_URL}`)

      const serv = createServer(app)
      const ws = new WebSocket.Server(serv)

      ws.on("message", socket => {
        socket.emit("ON")
      })

      ws.on("close", () => {
        console.log("closed")
      })

      serv.listen(PORT || 3000)

      console.log(`APP STARTED ON http://localhost:${PORT || 3000}`)
      console.log(`API DOCS: http://localhost:${PORT || 3000}/api-docs`)
    })
    .catch(e => console.error("COULD NOT CONNECT ON DB", e))
}

start()
