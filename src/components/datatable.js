// ** React Imports
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Reactstrap Imports
import { Spinner } from 'reactstrap'
import { useSkin } from "@hooks/useSkin"

// ** Third Party Imports
import DefaultDataTable, { createTheme } from "react-data-table-component"
import { ChevronDown } from "react-feather"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const DataTable = ({ data, columns, loading, paginationPerPage = null }) => {
  const { skin } = useSkin()

  return (
    <DefaultDataTable
      noHeader
      data={data}
      columns={columns}
      progressPending={loading}
      theme={skin}
      className="react-dataTable my-1"
      sortIcon={<ChevronDown size={10} />}
      pagination={paginationPerPage !== null}
      paginationRowsPerPageOptions={paginationPerPage}
      progressComponent={
        <div className="d-flex justify-content-center my-1">
          <Spinner color="primary" />
        </div>
      }
    />
  )
}

export default DataTable
