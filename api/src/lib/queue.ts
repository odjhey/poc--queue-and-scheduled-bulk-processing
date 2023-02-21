import { Queue } from 'bullmq'

export const NOTIFICATION_CHANNEL = 'Notification'
// TODO: add explicit connection
export const notificationQueue = new Queue(NOTIFICATION_CHANNEL, {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'fixed',
      delay: 3_000,
    },
  },
})
