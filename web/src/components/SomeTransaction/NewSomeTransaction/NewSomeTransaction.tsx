import type { CreateSomeTransactionInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SomeTransactionForm from 'src/components/SomeTransaction/SomeTransactionForm'

const CREATE_SOME_TRANSACTION_MUTATION = gql`
  mutation CreateSomeTransactionMutation($input: CreateSomeTransactionInput!) {
    createSomeTransaction(input: $input) {
      id
    }
  }
`

const NewSomeTransaction = () => {
  const [createSomeTransaction, { loading, error }] = useMutation(
    CREATE_SOME_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('SomeTransaction created')
        navigate(routes.someTransactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSomeTransactionInput) => {
    createSomeTransaction({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SomeTransaction</h2>
      </header>
      <div className="rw-segment-main">
        <SomeTransactionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSomeTransaction
