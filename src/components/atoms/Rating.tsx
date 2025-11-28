"use client"

import { Rating as MuiRating, type RatingProps as MuiRatingProps } from "@mui/material"

export function Rating({ ...props }: MuiRatingProps) {
  return <MuiRating {...props} />
}
