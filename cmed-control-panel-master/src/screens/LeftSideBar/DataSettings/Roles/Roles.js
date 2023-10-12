import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useRoles from '../../../../services/hooks/useRoles';

const columns = [
  { field: 'roleId', headerName: 'Role Id', width: 80 },
  { field: 'roleName', headerName: 'Role Name', width: 120 },
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
  { field: 'isForSignup', headerName: 'Is for SignUp', width: 130 },
  { field: 'accountTypeId', headerName: 'Account Type Id', width: 130 },
  { field: 'isSystem', headerName: 'Is System', width: 130 },
  { field: 'isDefault', headerName: 'Is Default', width: 130 },
  { field: 'createdBy', headerName: 'Created by', width: 130 },
  { field: 'createdDate', headerName: 'Created date', width: 130 },
  { field: 'modifiedBy', headerName: 'Modified by', width: 130 },
  { field: 'modifiedDate', headerName: 'Modified Date', width: 130 },
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

const Roles = () => {
  // eslint-disable-next-line no-unused-vars
  const { roles, error, loaded } = useRoles();

  return (
    <div>
      {!loaded && <div>loading...</div>}
      <div style={{ height: 'calc(100vh - 70px)', width: '100%' }}>
        <DataGrid
          rows={roles}
          columns={columns}
          getRowId={(role) => role.roleId}
          pageSize={25}
          rowsPerPageOptions={[25]}
          checkboxSelection
          initialState={{
            pinnedColumns: { left: ['name'], right: ['actions'] },
          }}
        />
      </div>
    </div>
  );
};

export default Roles;
