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
import { getProctorSchedule } from "@store/api/seelabs"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const Proctor = () => {
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const [visible, setVisible] = useState(true)
  const { proctorSchedule, isLoading } = useSelector((state) => state.seelabs)


  useEffect(() => {
    setVisible(getUserData()?.seelabs.proctor === "Invalid")
    dispatch(getProctorSchedule())
  }, [])

  const basicColumns = [
    {
      name: "#",
      center: true,
      grow: 0,
      cell: (row, index) => index + 1
    },
    {
      name: "Subject",
      minWidth: "17rem",
      selector: (row) => row.subject
    },
    {
      name: "Room",
      selector: (row) => row.room
    },
    {
      name: 'Day',
      selector: row => {
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        return days[row.day - 1]
      }
    },

    {
      name: "Shift",
      selector: (row) => row.shift
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Proctor Schedule</CardTitle>
      </CardHeader>

      <CardBody>
        <Alert color='danger' isOpen={visible}>
          <div className='alert-body'>
            <AlertCircle size={15} />
            <span className='ms-1'>
              Seelabs status is <strong>invalid</strong>. Please ensure that your <strong>Seelabs Proctor</strong> password is the same as your <strong>I-Smile</strong> account
            </span>
          </div>
        </Alert>
        <DataTable
          noHeader
          data={proctorSchedule}
          columns={basicColumns}
          progressPending={isLoading}
          theme={skin}
          className="react-dataTable my-1"
          sortIcon={<ChevronDown size={10} />}
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
export default Proctor
