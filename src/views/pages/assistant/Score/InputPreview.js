// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Reactstrap Imports
import { Fragment } from "react"
import { Card, CardHeader, CardTitle, CardBody, Spinner, Badge } from 'reactstrap'
import { ChevronDown } from "react-feather"
import DataTable, { createTheme } from "react-data-table-component"
import moment from 'moment/moment'
import Breadcrumbs from '@components/breadcrumbs'

import { useSkin } from "@hooks/useSkin"
import { useSelector } from 'react-redux'

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const InputPreview = () => {
  const { skin } = useSkin()
  const { inputScorePreview, isLoading } = useSelector(state => state.seelabs)
  const { module, scores, shift } = inputScorePreview

  const basicColumns = [
    {
      name: "Name",
      minWidth: "12rem",
      wrap: true,
      selector: (row) => row.name
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
    },
    {
      name: "Date",
      width: "12rem",
      selector: (row) => row.date,
      format: (row) => moment(row.paSubmitTime).utc().format("ddd, DD MMM YYYY")
    }

  ]

  return (
    <Fragment>
      <Breadcrumbs title='Input Result' data={[{ title: 'Group List', link: '/assistant/input-result' }, { title: 'Preview' }]} />
      <Card >
        <CardHeader>
          <CardTitle tag='h4'>Score Preview</CardTitle>
          {scores &&
            <div className="d-flex gap-1">
              <Badge className="ms-auto" color="light-info" pill>{`Module ${module ?? 0}`}</Badge>
              <Badge className="ms-auto" color="light-success" pill>{`Shift ${shift ?? 0}`}</Badge>
            </div>
          }
        </CardHeader>

        <CardBody>
          <DataTable
            noHeader
            data={scores}
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
    </Fragment>
  )
}
export default InputPreview
