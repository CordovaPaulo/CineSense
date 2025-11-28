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
      <Button variant="contained" color="secondary" onClick={onPrev} disabled={page <= 1 || loading}>
        Prev
      </Button>

      <Typography variant="body2">
        Page {page}{totalPages ? ` of ${totalPages}` : ""}
      </Typography>

      <Button variant="contained" color="secondary" onClick={onNext} disabled={loading || (totalPages ? page >= totalPages : false)}>
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
