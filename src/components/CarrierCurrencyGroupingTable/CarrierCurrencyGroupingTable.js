import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, MRT_ExpandAllButton } from 'material-react-table';
import { Box, Button, Stack } from '@mui/material';

const CarrierCurrencyGroupingTable = ({ data, onEdit, onDelete, onAddAccount }) => {
  const columns = useMemo(() => [
    {
      header: 'Carrier',
      accessorKey: 'carrierName', 
    },
    {
      header: 'Currency',
      accessorKey: 'currency', 
    },
    {
      header: 'Balance',
      accessorKey: 'balance',
    },
    {
      header: 'Balance Updated (per min)',
      accessorKey: 'balanceUpdated',
      size:'270'
    },
    {
      header: 'Account Manager',
      accessorKey: 'accountManager',
    },
    {
      header: 'Client Credit',
      accessorKey: 'clientCredit',
    },
    {
      header: 'Vendor Credit',
      accessorKey: 'vendorCredit',
    },
    {
      header: 'Actions',
      id: 'actions', // Custom column ID
      size: 120,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ], [onEdit, onDelete]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true, // Enable grouping functionality
    groupedColumnMode: 'remove', // Remove grouped columns from the main table
    initialState: {
      density: 'compact',
      expanded: false, // Expand all groups by default
      grouping: ['carrierName', 'currency'], // Group by Carrier first, then Currency
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Carrier & Currency</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
          }),
        }),
        size: 200,
      },
    },
  });

  return (
    <>
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <Button
          onClick={onAddAccount}
          sx={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 15px',
            cursor: 'pointer',
          }}
        >
          Add Account
        </Button>
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default CarrierCurrencyGroupingTable;