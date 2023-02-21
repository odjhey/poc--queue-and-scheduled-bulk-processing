import type { ComponentMeta } from '@storybook/react'

import BulkProcessingPage from './BulkProcessingPage'

export const generated = () => {
  return <BulkProcessingPage />
}

export default {
  title: 'Pages/BulkProcessingPage',
  component: BulkProcessingPage,
} as ComponentMeta<typeof BulkProcessingPage>
