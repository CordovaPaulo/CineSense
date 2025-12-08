import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { FiltersPanelProps } from '@/interfaces/interface'

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  genre,
  year,
  third,
  onGenreChange,
  onYearChange,
  onThirdChange,
  genres,
  years,
  thirdOptions,
  thirdLabel = "Options",
}) => {
  return (
    <Box className="flex flex-wrap items-center gap-4">
      <FormControl size="small" sx={{ minWidth: 160 }} color="secondary">
        <InputLabel id="genre-select-label" color="secondary">Genre</InputLabel>
        <Select labelId="genre-select-label" id="genre-select" value={genre} label="Genre" onChange={onGenreChange} sx={{ color: "secondary.main" }}>
          <MenuItem value=""><em>Select Genre</em></MenuItem>
          {genres.map((g) => (<MenuItem key={g} value={g}>{g}</MenuItem>))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }} color="secondary">
        <InputLabel id="year-select-label" color="secondary">Year</InputLabel>
        <Select labelId="year-select-label" id="year-select" value={year} label="Year" onChange={onYearChange} sx={{ color: "secondary.main" }}>
          <MenuItem value=""><em>Select Year</em></MenuItem>
          {years.map((y) => (<MenuItem key={String(y)} value={y}>{y}</MenuItem>))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }} color="secondary">
        <InputLabel id="third-select-label" color="secondary">{thirdLabel}</InputLabel>
        <Select labelId="third-select-label" id="third-select" value={third} label={thirdLabel} onChange={onThirdChange} sx={{ color: "secondary.main" }}>
          <MenuItem value=""><em>Select</em></MenuItem>
          {thirdOptions.map((o) => (<MenuItem key={o} value={o}>{o}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersPanel;
