import { Fragment } from 'react'
import EmojiHappyIcon from '../icons/outline/emojiHappyIcon'
import ExclamationIcon from '../icons/outline/exclamationIcon'
import Popup from './popup'

export default function InfoPopup({
  success,
  error,
  successHandler,
  errorHandler,
}) {
  return (
    <Fragment>
      {success && (
        <Popup
          onPressAnyOption={successHandler}
          message={success}
          title="Request Complete"
          okMessage="Ok"
          cancelMessage="Cancel"
          Icon={EmojiHappyIcon}
          show={false}
        />
      )}
      {error && (
        <Popup
          onPressAnyOption={errorHandler}
          message={error}
          title="Oops sorry"
          okMessage="Ok"
          cancelMessage="Cancel"
          Icon={ExclamationIcon}
          show={false}
        />
      )}
    </Fragment>
  )
}
