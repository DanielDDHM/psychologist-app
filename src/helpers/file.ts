import { StatusCode } from "../constants"
import { Exception } from "./exception"
import AWS from "aws-sdk"

export namespace FileHelper {
  interface File {
    file: string
    type: string
  }
  export const uploadFile = async (item: File) => {
    const { file, type } = item
    const fileExt = file.toLowerCase()
    const timestamp = new Date().getTime()
    const location = `${process.env.NODE_ENV}/files/${type}/${timestamp}.${fileExt}`
    const fileLink = await s3Upload(location, item)

    if (!fileLink) {
      throw new Exception.AppError(StatusCode.FAILED_DEPENDENCY, ["FILE NOT UPDATED"])
    }

    return { code: StatusCode.OK, fileLink }
  }

  export const deleteFile = async (item: File) => {
    const { file, type } = item
    const fileExt = file.toLowerCase()
    const timestamp = new Date().getTime()
    const location = `${process.env.NODE_ENV}/files/${type}/${timestamp}.${fileExt}`
    await s3Delete(location)
  }

  export const s3Upload = async (name: string, file: File) => {
    try {
      AWS.config.update({
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
        region: `${process.env.AWS_REGION}`,
      })

      const upload = await new AWS.S3()
        .upload({
          Bucket: "psy-assets",
          Key: name,
          Body: file.file,
          ACL: "public-read",
          ContentType: file.type,
        })
        .promise()

      return upload.Location
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }

  export const s3Delete = async (filename: string) => {
    try {
      AWS.config.update({
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
        region: `${process.env.AWS_REGION}`,
      })

      const s3 = new AWS.S3()

      const s3Params = {
        Bucket: "psy-assets",
        Key: filename,
      }

      s3.deleteObject(s3Params)
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }
}
