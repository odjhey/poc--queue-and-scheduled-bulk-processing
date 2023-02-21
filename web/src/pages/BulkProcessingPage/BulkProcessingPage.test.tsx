import { render } from '@redwoodjs/testing/web'

import BulkProcessingPage from './BulkProcessingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BulkProcessingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BulkProcessingPage />)
    }).not.toThrow()
  })
})
