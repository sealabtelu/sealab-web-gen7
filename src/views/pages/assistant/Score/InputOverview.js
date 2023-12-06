// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Third Party Components
import { Fragment, useEffect, useState } from 'react'
import moment from 'moment/moment'
import DataTable, { createTheme } from "react-data-table-component"
import Select from 'react-select'
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'
import { useSkin } from "@hooks/useSkin"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Spinner, ListGroup, ListGroupItem, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getInputOverview } from '@store/api/seelabs'
import { AlertCircle } from "react-feather"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const InputOverview = () => {
  const { skin } = useSkin()
  const dispatch = useDispatch()

  const {
    moduleOptions,
    inputScoreOverview,
    isLoading } = useSelector(state => state.seelabs)

  const [mentorOverview, setMentorOverview] = useState([])
  const [currentModule, setCurrentModule] = useState([])
  const [missingGroups, setMissingGroups] = useState([])

  useEffect(() => {
    const mentorOverview = []
    const missingGroups = []
    const groups = inputScoreOverview.map(({ mentor: name, group }) => {
      const existingMentor = mentorOverview.find(item => item.name === name)
      if (existingMentor) {
        existingMentor.total += 1
        existingMentor.groups.push(group)
      } else {
        mentorOverview.push({
          name,
          total: 1,
          groups: [group]
        })
      }
      return group
    })
    if (groups.length > 0) {
      for (let i = 1; i <= 44; i++) if (!groups.includes(i)) missingGroups.push(i)
      mentorOverview.sort((a, b) => a.name.localeCompare(b.name))
      setMentorOverview(mentorOverview)
      setMissingGroups(missingGroups)
    }
  }, [inputScoreOverview])

  const basicColumns = [
    {
      name: 'Group',
      maxWidth: '150px',
      center: true,
      selector: row => row.group
    },
    {
      name: 'Names',
      minWidth: '300px',
      cell: row => (
        <ListGroup flush style={{ width: '100%' }}>
          {row.studentList.map(({ name }, index) => (
            <ListGroupItem
              key={index}
              style={{ backgroundColor: 'transparent', paddingLeft: '0px' }}>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      )
    },
    {
      name: 'Date',
      minWidth: '300px',
      cell: row => (
        <ListGroup flush style={{ width: '100%' }}>
          {row.studentList.map(({ inputDate }, index) => (
            <ListGroupItem
              key={index}
              style={{ backgroundColor: 'transparent', paddingLeft: '0px' }}>
              {moment(inputDate).utc().format("dddd, DD MMMM YYYY")}
            </ListGroupItem>
          ))}
        </ListGroup>
      )
    }
  ]

  const summaryColumns = [
    {
      name: "#",
      center: true,
      grow: 0,
      cell: (row, index) => index + 1
    },
    {
      name: 'Assistant Name',
      minWidth: '300px',
      sortable: true,
      selector: row => row.name
    },
    {
      name: 'Group List',
      selector: row => JSON.stringify(row.groups)
    },
    {
      name: 'Total Shift',
      sortable: true,
      selector: row => `${row.total} Shift`
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Input Overview' data={[{ title: 'Input Overview' }]} />
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Assistant Overview</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='mb-1' md='4' sm='12'>
              <Label className='form-label'>Select Module</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={moduleOptions}
                value={currentModule}
                disabled={isLoading}
                onChange={(selectedOption) => {
                  dispatch(getInputOverview({ module: selectedOption.value }))
                  setCurrentModule(selectedOption)
                }}
              />
            </Col>
          </Row>
          <Alert color='warning' style={{ marginBottom: 0 }} isOpen={missingGroups.length > 0 && !isLoading}>
            <div className='alert-body'>
              <AlertCircle size={15} />
              <span className='ms-1'>
                Group <strong>{JSON.stringify(missingGroups)}</strong> is Missing
              </span>
            </div>
          </Alert>
          <Row>
            <DataTable
              noHeader
              striped
              highlightOnHover
              data={mentorOverview}
              columns={summaryColumns}
              progressPending={isLoading}
              theme={skin}
              className="react-dataTable my-1"
              progressComponent={
                <div className="d-flex justify-content-center my-1">
                  <Spinner color="primary" />
                </div>
              }
            />
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Group Overview</CardTitle>
        </CardHeader>

        <CardBody>
          <DataTable
            noHeader
            expandableRows
            striped
            highlightOnHover
            data={inputScoreOverview}
            columns={basicColumns}
            progressPending={isLoading}
            theme={skin}
            className="react-dataTable my-1"
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
    </Fragment>
  )
}
export default InputOverview
