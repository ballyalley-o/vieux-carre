import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from 'auth'

const f = createUploadthing()

export const ourFileRouter = {
    imageUploader: f({
        /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
        image: { maxFileSize: "4MB", maxFileCount: 4 },

    })
    .middleware(async () => {
        const session = await auth()
        if (!session) throw new UploadThingError("Unauthorized")
        const userId = session?.user?.id
        return { userId }
    })
    .onUploadComplete(async ({ metadata }) => {
        return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter