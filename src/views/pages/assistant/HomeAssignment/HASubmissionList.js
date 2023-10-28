// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Button
} from "reactstrap"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswerList } from '@store/api/homeAssignmentAnswer'
import { useSkin } from "@hooks/useSkin"
import { NavLink } from 'react-router-dom'

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const HASubmissionList = () => {
  // ** state
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { answers, isLoading } = useSelector(state => state.homeAssignmentAnswer)

  useEffect(() => {
    dispatch(getAnswerList())
  }, [])

  const basicColumns = [
    {
      name: 'NIM',
      minWidth: '9rem',
      sortable: true,
      selector: ({ studentInfo: row }) => row.nim
    },
    {
      name: 'Name',
      sortable: true,
      wrap: true,
      minWidth: '17rem',
      selector: ({ studentInfo: row }) => row.name
    },
    {
      name: 'Day',
      sortable: true,
      selector: ({ studentInfo: row }) => {
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        return days[row.day - 1]
      }
    },
    {
      name: 'Shift',
      sortable: true,
      selector: ({ studentInfo: row }) => `Shift ${row.shift}`
    },
    {
      name: 'Group',
      sortable: true,
      minWidth: '9rem',
      selector: ({ studentInfo: row }) => `Group ${row.group}`
    },
    {
      name: 'Module',
      sortable: true,
      minWidth: '9rem',
      selector: row => row.moduleInfo.split(':')[0]
    },
    {
      name: "Link",
      button: true,
      minWidth: '9rem',
      selector: (row) => (
        <NavLink to={row.filePath} target="_blank">
          <Button.Ripple
            color='primary'
            disabled={isLoading}
          >
            Link
          </Button.Ripple>
        </NavLink>
      )
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Home Assignment' data={[{ title: 'Home Assignment' }, { title: 'Submission' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Home Assignment Submission</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              data={answers}
              columns={basicColumns}
              progressPending={isLoading}
              theme={skin}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              progressComponent={
                <div className='d-flex justify-content-center my-1'>
                  <Spinner color='primary' />
                </div>
              }
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default HASubmissionList
