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
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'
import moment from 'moment/moment'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswerList } from '@store/api/journalAnswer'
import { useSkin } from "@hooks/useSkin"
import { NavLink } from 'react-router-dom'

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const JSubmissionList = () => {
  // ** state
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { answers, isLoading } = useSelector(state => state.journalAnswer)

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
      minWidth: '8rem',
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
      name: "Submit Time",
      sortable: true,
      wrap: true,
      minWidth: '11rem',
      selector: (row) => row.submitTime,
      format: (row) => moment(row.submitTime).utc().format("ddd DD MMM YYYY h:mm A")
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
      <Breadcrumbs title='Journal' data={[{ title: 'Journal' }, { title: 'Submission' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Journal Submission</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              expandableRows
              data={answers}
              columns={basicColumns}
              progressPending={isLoading}
              theme={skin}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              expandableRowsComponent={({ data: { feedback } }) => {
                return (
                  <div className='expandable-content p-2'>
                    {
                      feedback && <ListGroup className='list-group-horizontal-sm justify-content-center mb-2'>
                        <ListGroupItem><p className="fw-bold">Assistant</p>{feedback.assistant}</ListGroupItem>
                        <ListGroupItem><p className="fw-bold">Session</p>{feedback.session}</ListGroupItem>
                        <ListGroupItem><p className="fw-bold">Laboratory</p>{feedback.laboratory}</ListGroupItem>
                      </ListGroup>
                    }
                  </div>
                )
              }}
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

export default JSubmissionList
