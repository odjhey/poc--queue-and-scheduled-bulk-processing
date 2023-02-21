import type {
  EditSomeTransactionById,
  UpdateSomeTransactionInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SomeTransactionForm from 'src/components/SomeTransaction/SomeTransactionForm'

export const QUERY = gql`
  query EditSomeTransactionById($id: Int!) {
    someTransaction: someTransaction(id: $id) {
      id
      owner
      lastProcessedAt
    }
  }
`
const UPDATE_SOME_TRANSACTION_MUTATION = gql`
  mutation UpdateSomeTransactionMutation(
    $id: Int!
    $input: UpdateSomeTransactionInput!
  ) {
    updateSomeTransaction(id: $id, input: $input) {
      id
      owner
      lastProcessedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  someTransaction,
}: CellSuccessProps<EditSomeTransactionById>) => {
  const [updateSomeTransaction, { loading, error }] = useMutation(
    UPDATE_SOME_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('SomeTransaction updated')
        navigate(routes.someTransactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSomeTransactionInput,
    id: EditSomeTransactionById['someTransaction']['id']
  ) => {
    updateSomeTransaction({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit SomeTransaction {someTransaction?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SomeTransactionForm
          someTransaction={someTransaction}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
