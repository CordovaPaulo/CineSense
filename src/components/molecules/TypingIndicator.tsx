"use client"

import { Box } from "../atoms/Box"
import { Paper } from "../atoms/Paper"
import { keyframes } from "@mui/system"
import { Text } from "../atoms/Text"

const bounce = keyframes`
  0% { transform: translateY(0); opacity: 0.6 }
  50% { transform: translateY(-6px); opacity: 1 }
  100% { transform: translateY(0); opacity: 0.6 }
`

export function TypingIndicator() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
      <Paper sx={{
        maxWidth: '40%',
        backgroundColor: '#121212',
        color: '#f2f2f2',
        p: 1.25,
        borderRadius: '0.75rem',
        border: '1px solid #2b2b2b',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cfcfcf', animation: `${bounce} 1s infinite ease-in-out`, animationDelay: '0s' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cfcfcf', animation: `${bounce} 1s infinite ease-in-out`, animationDelay: '0.15s' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cfcfcf', animation: `${bounce} 1s infinite ease-in-out`, animationDelay: '0.3s' }} />
          </Box>
          <Text variant="body2" sx={{ color: '#a3a3a3' }}>AI is typing…</Text>
        </Box>
      </Paper>
    </Box>
  )
}

export default TypingIndicator
