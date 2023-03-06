import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Box, TextField } from "@mui/material"
import moment from "moment"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Row {
  id: number;
  base_currency_code: string;
  quote_currency_code: string;
  base_currency_name: string;
  quote_currency_name: string;
  rate: number;
  created_at: string;
}

const columns: GridColDef[] = [
  {
    field: 'base_currency_code',
    headerName: 'Base Code',
    width: 100,
    headerAlign: "center",
    filterable: false,
    sortable: false,
  },
  {
    field: 'base_currency_name',
    headerName: 'Base Name',
    width: 150,
    headerAlign: "center",
    filterable: false,
    sortable: false
  },
  {
    field: 'quote_currency_code',
    headerName: 'Quote Code',
    width: 100,
    headerAlign: "center",
    filterable: false,
    sortable: false
  },
  {
    field: 'quote_currency_name',
    headerName: 'Quote Name',
    width: 150,
    headerAlign: "center",
    filterable: false,
    sortable: false
  },
  {
    field: 'rate',
    headerName: "Rate",
    type: "number",
    width: 75,
    headerAlign: "center",
    filterable: false,
    sortable: false
  },
  {
    field: "created_at",
    headerName: "Time",
    width: 200,
    headerAlign: "center",
    filterable: false,
    sortable: false,
    valueFormatter: params =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  }
];

const useGetConversionRate = (limit: string) => {
  const [rows, setRows] = useState<Row[] | null>(null)
  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(`https://api-buenel4xzq-uc.a.run.app/conversion-rates?limit=${limit}`)
      const rows = await response.json();
      setRows(rows)
    }
    try {
      fetchRates()
    } catch (e: any) {
      console.log('e :>> ', e);
    }

  }, [limit])
  return rows;
}

const App: FC = () => {
  const [limit, setLimit] = useState<string>('24')
  const rows: Row[] | null = useGetConversionRate(limit)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "" || parseInt(e.target.value) >= 0) {
      setLimit(e.target.value)
    }
  }

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      m: 4
    }}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{
        height: "100vh",
      }}>
        <TextField label="Limit" variant="outlined" sx={{ width: 75, mb: 4 }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={limit} onChange={handleChange} />
        <Box data-testid="grid" sx={{ width: "50vw", height: "75vh", minWidth: 500 }}>
          {rows &&
            <DataGrid
              rows={rows}
              columns={columns}
            />}
        </Box>
      </Box>
    </Box >
  );
}

export default App;
