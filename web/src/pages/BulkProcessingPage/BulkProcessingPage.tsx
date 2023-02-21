import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const PROCESS_ALL_SOME_TRANSACTION_MUTATION = gql`
  mutation ProcessAllSomeTransactionMutation {
    processAllSomeTransaction {
      id
    }
  }
`

const BulkProcessingPage = () => {
  const [processSomeTransaction] = useMutation(
    PROCESS_ALL_SOME_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('SomeTransaction processed')
        navigate(routes.someTransactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onProcessClick = () => {
    if (confirm('Are you sure you want to process ALL someTransaction?')) {
      processSomeTransaction()
    }
  }

  return (
    <>
      <MetaTags title="BulkProcessing" description="BulkProcessing page" />
      <button
        type="button"
        title={'Process All someTransaction '}
        className="rw-button rw-button-small rw-button-blue"
        onClick={() => onProcessClick()}
      >
        Process All
      </button>
    </>
  )
}

export default BulkProcessingPage
