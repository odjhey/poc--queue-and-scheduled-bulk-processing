import EditSomeTransactionCell from 'src/components/SomeTransaction/EditSomeTransactionCell'

type SomeTransactionPageProps = {
  id: number
}

const EditSomeTransactionPage = ({ id }: SomeTransactionPageProps) => {
  return <EditSomeTransactionCell id={id} />
}

export default EditSomeTransactionPage
