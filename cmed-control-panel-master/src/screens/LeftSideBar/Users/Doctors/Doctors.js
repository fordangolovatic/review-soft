import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import useAccount from '../../../../services/hooks/useAccount';

const columns = [
  { field: 'accountId', headerName: 'Account Id', width: 50 },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const { api } = params;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            // eslint-disable-next-line no-return-assign
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );

        // eslint-disable-next-line no-alert
        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 180 },
  {
    field: 'accountTypeId',
    headerName: 'Type',
    type: 'number',
    width: 90,
  },
  // {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'address', headerName: 'Address', width: 130 },
  { field: 'cityId', headerName: 'City Id', width: 130 },
  { field: 'postalCode', headerName: 'Postal Code', width: 130 },
  { field: 'parentAccountId', headerName: 'Parent Id', width: 130 },
  { field: 'isTranslator', headerName: 'Is Translator', width: 130 },
  { field: 'isVerified', headerName: 'Is Verified', width: 130 },
  { field: 'dateOfBirth', headerName: 'Date of birth', width: 130 },
  { field: 'termsAndConditionAccepted', headerName: 'Terms', width: 130 },
  { field: 'profileImage', headerName: 'Image', width: 130 },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];


const Doctors = () => {
  // eslint-disable-next-line no-unused-vars
  const { account, error, loaded } = useAccount();
  // eslint-disable-next-line no-console
  console.log(account)
  return(
      <div>
        <div style={{ height: 'calc(100vh - 70px)', width: '100%' }}>
          <DataGrid
              rows={account}
              columns={columns}
              getRowId={(row) => row.accountId}
              pageSize={25}
              rowsPerPageOptions={[25]}
              checkboxSelection
              initialState={{ pinnedColumns: { left: ['accountId'], right: ['actions'] } }}
          />
        </div>
      </div>
      )
    

};

export default Doctors;
