import { db } from 'api/src/lib/db'
import { NOTIFICATION_CHANNEL } from 'api/src/lib/queue'
import { Worker } from 'bullmq'

// TODO: add explicit connection
export default async ({ _args }) => {
  const _worker = new Worker(NOTIFICATION_CHANNEL, async (job) => {
    const processingKey = job.data['processingKey']
    const notifRequest = await db.someTransaction.findUnique({
      where: {
        processingKey,
      },
    })

    // do yar thang here, send some message or what

    const updatedNotifRequest = await db.someTransaction.update({
      where: { processingKey },
      data: { lastProcessedAt: new Date() },
    })

    console.log('processjob', job.data, notifRequest, updatedNotifRequest)
  })
}
