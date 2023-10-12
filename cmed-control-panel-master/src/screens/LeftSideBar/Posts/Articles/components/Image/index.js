import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const ImageUpload = ({ values, setFieldValue }) => {
  const [image, setImage] = useState(values.image);

  const fileTypes = ['JPEG', 'PNG', 'GIF'];

  const handleImageChange = (image) => {
    let newImage = URL.createObjectURL(image[0]);

    setImage(newImage);
    setFieldValue('image', newImage);
  };

  const removeImage = () => {
    setImage(null);
    setFieldValue('image', '');
  };

  return (
    <Box alignSelf="flex-start" flexDirection="column">
      <Typography marginTop="25px" marginBottom="5px" textAlign="start">
        Add image +
      </Typography>
      {!image ? (
        <FileUploader
          multiple
          handleChange={(file) => handleImageChange(file)}
          name="file"
          types={fileTypes}
        />
      ) : (
        <Box position="relative" display="flex" alignItems="start">
          <Box
            position="absolute"
            top={5}
            right={8}
            color="#000"
            onClick={removeImage}
            sx={{
              padding: '4px 9px',
              borderRadius: '100px',
              background: 'white',
              ':hover': { background: '#F44336', color: '#000' },
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
          >
            x
          </Box>
          <img
            style={{
              width: 150,
              height: 150,
              objectFit: 'cover',
              borderRadius: 8,
            }}
            src={image}
            alt="article banner"
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
