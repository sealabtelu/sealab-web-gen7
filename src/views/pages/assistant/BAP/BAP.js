// ** Styles
import "@src/assets/scss/pilih-group.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Third Party Components
import { useEffect } from "react"
import { ChevronDown } from "react-feather"
import Flatpickr from "react-flatpickr"
import moment from 'moment/moment'
import DataTable, { createTheme } from "react-data-table-component"

// ** Utils
import { useSkin } from "@hooks/useSkin"
import { formatUTCtoLocale } from "@utils"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  Label,
  Button,
  Spinner
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getBAP } from "@store/api/seelabs"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const BAP = () => {
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { bap, isLoading } = useSelector((state) => state.seelabs)

  useEffect(() => {
    dispatch(getBAP())
  }, [])

  const basicColumns = [
    {
      name: "#",
      center: true,
      grow: 0,
      cell: (row, index) => index + 1
    },
    {
      name: "Date",
      minWidth: "20rem",
      selector: (row) => row.date,
      format: (row) => moment(row.date).utc().format("dddd, DD MMMM YYYY")
    },
    {
      name: "Module",
      center: true,
      selector: (row) => row.module
    },
    {
      name: "Shift",
      center: true,
      selector: (row) => row.shift
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">BAP</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" md="4" sm="12">
            <Label className="form-label" for="default-picker">
              Pilih tanggal awal jaga
            </Label>
            <Flatpickr
              className="form-control"
              disabled={isLoading}
              options={{ defaultDate: new Date() }}
              onChange={(date) => {
                dispatch(getBAP(formatUTCtoLocale(date)))
              }}
            />
          </Col>
        </Row>
        <Row>
          <DataTable
            noHeader
            data={bap}
            columns={basicColumns}
            progressPending={isLoading}
            theme={skin}
            className="react-dataTable my-1"
            sortIcon={<ChevronDown size={10} />}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            progressComponent={
              <div className="d-flex justify-content-center my-1">
                <Spinner color="primary" />
              </div>
            }
          />
        </Row>
      </CardBody>
    </Card>
  )
}
export default BAP
