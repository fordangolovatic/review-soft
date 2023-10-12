export const textFieldDataPicker = {
  '.MuiInputLabel-root[data-shrink="true"] + .MuiInputBase-root fieldset span': {
    display: 'none',
  },
  '.MuiInputLabel-root[data-shrink="true"]': {
    display: 'none',
  },
  '.MuiInputLabel-root + .MuiInputBase-root': {
    backgroundColor: '#EFEFEF',
  },
  '.MuiInputBase-input': {
    padding: '12px 0',
    paddingLeft: '13px',
  },
  '.MuiFormLabel-root': {
    top: '50%',
    left: '13px',
    transform: 'translateY(-50%)',
  },
};
export const textFieldMediumWithoutOuterLabel = {
  '& .MuiInputBase-root': {
    backgroundColor: '#EFEFEF',
  },
  '& .MuiInputBase-root .MuiInputBase-input': {
    padding: '3px 0',
    paddingLeft: '5px',
  },
};
