import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProperties, deleteProperty } from "../../redux/propertySlice";
import { 
  Container, 
  Typography, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button ,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import PropertyCardHorizontal from "../../components/PropertyCardHorizontal";
import { useNavigate, Link } from "react-router-dom";

const MyListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myProperties = [], loading } = useSelector((state) => state.property || {});

  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  // Open the modal and store the property ID
  const handleOpen = (id) => {
    setSelectedPropertyId(id);
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedPropertyId(null);
  };

  // Confirm delete action
  const handleDelete = () => {
    if (selectedPropertyId) {
      dispatch(deleteProperty(selectedPropertyId));
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Properties
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress size={50} />
          <Typography mr={2} pr={4}>Loading...</Typography>
        </Box>
        
      ) : (
        <Grid container spacing={4}>
          {myProperties.map((property) => (
            <Grid size={{xs:12, sm:6, md:4}} key={property._id}>
              <PropertyCardHorizontal
                property={property}
                showActions
                onEdit={() => navigate(`/agent/property/edit/${property._id}`)}
                onDelete={() => handleOpen(property._id)} // Open modal
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"  onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {!loading && myProperties.length === 0 && (
        <>
          <Alert severity="info" sx={{ my: 3 }}>
            No Properties Found.
          </Alert>

          <Button
            component={Link}
            to="/agent/property/add"
            variant="outlined"
            color="success"
            size="large"

          >
            Start Adding Properties!
          </Button>
        </>
      )}
      
    </Container>
  );
};

export default MyListings;
