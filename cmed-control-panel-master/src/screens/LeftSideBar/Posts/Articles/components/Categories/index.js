import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles({
  select: {
    '& .MuiSelect-filled': {
      paddingTop: 10,
    },
  },
  textField: {
    '& .MuiFilledInput-root': {
      paddingTop: 8,
      paddingBottom: '6px !important',
    },
  },
});

const categorySugesstions = [
  'Rheumatology',
  'Urology',
  'Nephrology',
  'Otolarynology',
  'Allergy',
  'Immunology',
  'Oncology',
  'Hematology',
  'Geriatrics',
  'Pulmonology',
  'Psychology',
  'Dermatology',
];

const Categories = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const styles = useStyles();
  const [currentOption, setCurrentOption] = useState('');

  const handleCategoryAdd = () => {
    if(!currentOption) return

    setFieldValue('categories', [...values.categories, currentOption]);

    setCurrentOption('');
  };

  const handleCategoryDelete = (category) => {
    setFieldValue(
      'categories',
      values.categories.filter((c) => c !== category),
    );
  };

  return (
    <Box display="flex" flexDirection="column" columnGap={1}>
      <Box display="flex" flexDirection="row" columnGap={1}>
        <Box width={200}>
          <Select
            name="type"
            className={styles.select}
            variant="filled"
            fullWidth
            label="Type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="medical">Medical</MenuItem>
            <MenuItem value="news">News</MenuItem>
          </Select>
        </Box>
        <Box display="flex" columnGap={1} alignItems="center">
          <Box width={200}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Category"
                  className={styles.textField}
                  size="small"
                  variant="filled"
                />
              )}
              disableUnderline
              options={categorySugesstions.filter(
                (c) => !values.categories.includes(c),
              )}
              value={currentOption}
              onChange={(_, value) => {
                setCurrentOption(value);
              }}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{
              height: 32,
            }}
            size="small"
            color="primary"
            onClick={handleCategoryAdd}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap">
        {values.categories &&
          values.categories.map((c) => (
            <Chip
              key={c}
              label={c}
              onDelete={() => handleCategoryDelete(c)}
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                marginRight: '10px',
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Categories;
