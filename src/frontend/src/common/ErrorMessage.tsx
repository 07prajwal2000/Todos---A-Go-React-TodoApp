import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

const ErrorMessage = ({message}: {message?: string}) => {
  return (
    <div className="text-danger p-0">&emsp; <ExclamationCircleIcon width={'20px'} />{message}</div>
  )
}

export default ErrorMessage