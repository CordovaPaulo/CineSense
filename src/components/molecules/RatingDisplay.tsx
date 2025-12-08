"use client"

import { Box } from "../atoms/Box"
import { Rating } from "../atoms/Rating"
import { BodyText } from "../atoms/Text"
import type { RatingDisplayProps } from '@/interfaces/interface'

export function RatingDisplay({ rating, size = "small" }: RatingDisplayProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Rating value={rating / 2} readOnly size={size} />
      <BodyText>{rating.toFixed(1)}</BodyText>
    </Box>
  )
}
