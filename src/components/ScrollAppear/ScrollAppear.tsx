import { Box } from "@mui/material";
import { appear } from "@/animations/appear";

export default function ScrollAppear({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        animation: `${appear} 5s linear`,
        animationTimeline: "view()",
        animationRange: "entry 0% cover 40%",
      }}
    >
      {children}
    </Box>
  );
}
