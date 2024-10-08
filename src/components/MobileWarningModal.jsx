import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const MobileWarningModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create Zines on Desktop
        </Typography>
        <Typography variant="body1" gutterBottom>
          The editing tools work best on larger screens. You can continue on your mobile device, but for the smoothest experience, we recommend using a desktop.
        </Typography>
        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Continue on Mobile
        </Button>
      </Box>
    </Modal>
  );
};

export default MobileWarningModal;