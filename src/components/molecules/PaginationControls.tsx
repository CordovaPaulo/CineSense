import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  page: number;
  totalPages?: number;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const PaginationControls: React.FC<Props> = ({ page, totalPages, loading, onPrev, onNext }) => {
  return (
    <Box className="mt-6 flex items-center justify-center gap-4">
      <Button variant="outlined" onClick={onPrev} disabled={page <= 1 || loading}
      sx={{
        backgroundColor: "none",
        border: "1px solid #FFB22C",
        color: "#FFB22C",
        "&:hover": {
          border: "1px solid #FFB22C",
          backgroundColor: "rgba(255, 178, 44, 0.1)", // optional hover effect
        },
      }}>
        Prev
      </Button>

      <Typography variant="body2">
        Page {page}{totalPages ? ` of ${totalPages}` : ""}
      </Typography>

      <Button variant="outlined" onClick={onNext} disabled={loading || (totalPages ? page >= totalPages : false)}
        sx={{
          backgroundColor: "none",
        border: "1px solid #FFB22C",
        color: "#FFB22C",
        "&:hover": {
          border: "1px solid #FFB22C",
          backgroundColor: "rgba(255, 178, 44, 0.1)", // optional hover effect
        },
        }}>
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
