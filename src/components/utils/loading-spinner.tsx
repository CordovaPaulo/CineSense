"use client"

import { LoadingIndicator } from "../molecules/LoadingIndicator"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return <LoadingIndicator message={message} />
}
