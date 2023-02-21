import type {
  EditSomeTransactionById,
  UpdateSomeTransactionInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormSomeTransaction = NonNullable<
  EditSomeTransactionById['someTransaction']
>

interface SomeTransactionFormProps {
  someTransaction?: EditSomeTransactionById['someTransaction']
  onSave: (
    data: UpdateSomeTransactionInput,
    id?: FormSomeTransaction['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const SomeTransactionForm = (props: SomeTransactionFormProps) => {
  const onSubmit = (data: FormSomeTransaction) => {
    props.onSave(data, props?.someTransaction?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormSomeTransaction> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="owner"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner
        </Label>

        <TextField
          name="owner"
          defaultValue={props.someTransaction?.owner}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="owner" className="rw-field-error" />

        <Label
          name="lastProcessedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last processed at
        </Label>

        <DatetimeLocalField
          name="lastProcessedAt"
          defaultValue={formatDatetime(props.someTransaction?.lastProcessedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="lastProcessedAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SomeTransactionForm
