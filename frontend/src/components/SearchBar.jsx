import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Tabs, Tab } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchType, setSearchType] = useState(0); // 0 = Buy, 1 = Rent, 2 = Short Let
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const navigate = useNavigate();

  const categoryOptions = ["Buy", "Rent", "Short Let"];

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams({
        category: categoryOptions[searchType].toLowerCase(),
        keyword,
        city,
        minPrice,
        maxPrice,
        bedrooms,
      }).toString();

      // Navigate to the listing page with query params
      navigate(`/properties?${query}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 4, borderRadius: 2 }}>
      {/* Tabs */}
      <Tabs
        value={searchType}
        onChange={(e, newValue) => setSearchType(newValue)}
        textColor="inherit"
        indicatorColor="primary"
        // sx={{
        //   mb: 3,
        //   background: "rgba(0, 69, 41, 0.2)",
        //   borderRadius: 2,
        //   width: { xs: "90%", md: "50%" },
        //   "& .MuiTabs-indicator": {
        //     backgroundColor: "#2e7d32",
        //     height: 4,
        //   }
        // }}
        sx={{
            background: "rgba(0, 69, 41, 0.2)",
            borderRadius: 2,
            mb: 3,
            width: { xs: "100%" },
            "& .MuiTabs-indicator": {
            backgroundColor: "#2e7d32", // Dark green
            height: 4, // Thicker underline
            }
        }}
      >
        {categoryOptions.map((label, i) => (
          <Tab key={i} label={label} sx={{ flex: 1 }} />
        ))}
      </Tabs>

      {/* Search Fields */}
      <Grid2 container spacing={2}>

        <Grid2 size={{xs:12, sm:8}}>
          <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
            <InputLabel>City</InputLabel>
            <Select value={city} onChange={(e) => setCity(e.target.value)} label="City">
              <MenuItem value="Lagos">Lagos</MenuItem>
              <MenuItem value="Abuja">Abuja</MenuItem>
              <MenuItem value="Kano">Kano</MenuItem>
              <MenuItem value="Port Harcourt">Port Harcourt</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{xs:12, sm:4}}>
          <Button
            onClick={handleSearch}
            variant="contained"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#1e824a",
              fontWeight: "bold",
              '&:hover': { bgcolor: '#136338' }
            }}
          >
            Search
          </Button>
        </Grid2>

        <Grid2 size={{xs:6, sm:4}}>
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            fullWidth
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
        </Grid2>

        <Grid2 size={{xs:6, sm:4}}>
          <TextField
            label="Max Price"
            type="number"
            variant="outlined"
            fullWidth
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
        </Grid2>

        <Grid2 size={{xs:12, sm:4}}>
          <TextField
            label="Bedrooms"
            type="number"
            variant="outlined"
            fullWidth
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SearchBar;
