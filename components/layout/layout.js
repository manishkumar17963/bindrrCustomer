import React, { Fragment } from 'react'

import ShieldCheckIcon from '../icons/outline/shieldCheckIcon'

import NotificationPopup from '../common/notificationPopup'

export default function Layout({ children }) {
  return (
    <Fragment>
      <Fragment>{children}</Fragment>
    </Fragment>
  )
}
