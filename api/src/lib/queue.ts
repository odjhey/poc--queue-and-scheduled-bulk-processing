import { Queue } from 'bullmq'

// TODO: add explicit connection
export const messageQueue = new Queue('Message')
