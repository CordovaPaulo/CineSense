"use client"

import { Box } from "../atoms/Box"
import { Rating } from "../atoms/Rating"
import { BodyText } from "../atoms/Text"

interface RatingDisplayProps {
  rating: number
  size?: "small" | "medium" | "large"
}

export function RatingDisplay({ rating, size = "small" }: RatingDisplayProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Rating value={rating / 2} readOnly size={size} />
      <BodyText>{rating.toFixed(1)}</BodyText>
    </Box>
  )
}
