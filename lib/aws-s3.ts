import { S3Client } from "@aws-sdk/client-s3"
import { GLOBAL } from "vieux-carre"

export const s3 = new S3Client({
    region: GLOBAL.AWS.AWS_REGION!,
    credentials: {
        accessKeyId    : GLOBAL.AWS.AWS_ACCESS_KEY_ID,
        secretAccessKey: GLOBAL.AWS.AWS_SECRET_ACCESS_KEY
    }
})