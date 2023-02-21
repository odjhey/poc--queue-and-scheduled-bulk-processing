import { Worker } from 'bullmq'

// TODO: add explicit connection
export default async ({ _args }) => {
  const _worker = new Worker('Message', async (_job) => {
    // const processingKey = job.data['processingKey']
    // const notifRequest = await db.notificationRequest.findUnique({
    //   where: {
    //     processingKey,
    //   },
    // })
    // // do yar thang here
    // const updatedNotifRequest = await db.notificationRequest.update({
    //   where: { processingKey },
    //   data: { processedAt: new Date() },
    // })
    // console.log('processjob', job.data, notifRequest, updatedNotifRequest)
  })
}
