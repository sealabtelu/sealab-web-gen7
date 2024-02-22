// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Third Party Components
import { useEffect, useState } from "react"
import { AlertCircle, ChevronDown } from "react-feather"
import DataTable, { createTheme } from "react-data-table-component"

// ** Utils
import { useSkin } from "@hooks/useSkin"
import { getUserData } from "@utils"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Badge,
  Alert
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getStudentScore } from "@store/api/seelabs"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const Score = () => {
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const [visible, setVisible] = useState(true)
  const { score, isLoading } = useSelector((state) => state.seelabs)


  useEffect(() => {
    setVisible(getUserData()?.seelabs === "Invalid")
    dispatch(getStudentScore())
  }, [])

  const basicColumns = [
    {
      name: "Module",
      center: true,
      width: "8rem",
      selector: (row) => row.module
    },
    {
      name: "Presence",
      center: true,
      width: "9rem",
      selector: (row) => <Badge className="ms-auto" color={row.presence ? "light-success" : "light-danger"} pill> {row.presence ? "Present" : "Absent"}</Badge >
    },
    {
      name: "TP",
      center: true,
      width: "5rem",
      selector: (row) => row.tp
    },
    {
      name: "TA",
      center: true,
      width: "5rem",
      selector: (row) => row.ta
    },
    {
      name: "D1",
      center: true,
      width: "5rem",
      selector: (row) => row.d1
    },
    {
      name: "D2",
      center: true,
      width: "5rem",
      selector: (row) => row.d2
    },
    {
      name: "D3",
      center: true,
      width: "5rem",
      selector: (row) => row.d3
    },
    {
      name: "D4",
      center: true,
      width: "5rem",
      selector: (row) => row.d4
    },
    {
      name: "I1",
      center: true,
      width: "5rem",
      selector: (row) => row.i1
    },
    {
      name: "I2",
      center: true,
      width: "5rem",
      selector: (row) => row.i2
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Score</CardTitle>
      </CardHeader>

      <CardBody>
        <Alert color='danger' isOpen={visible}>
          <div className='alert-body'>
            <AlertCircle size={15} />
            <span className='ms-1'>
              Seelabs status is <strong>invalid</strong>. Please ensure that your <strong>Seelabs</strong> password is the same as your <strong>SEA</strong> account
            </span>
          </div>
        </Alert>
        <DataTable
          noHeader
          expandableRows
          data={score}
          columns={basicColumns}
          progressPending={isLoading}
          theme={skin}
          className="react-dataTable my-1"
          sortIcon={<ChevronDown size={10} />}
          expandableRowsComponent={({ data }) => {
            return (
              <div className='expandable-content p-2'>
                <p>
                  <span className='fw-bold'>Mentor:</span> {data.mentor}
                </p>
              </div>
            )
          }}
          progressComponent={
            <div className="d-flex justify-content-center my-1">
              <Spinner color="primary" />
            </div>
          }
        />
      </CardBody>
    </Card>
  )
}
export default Score
