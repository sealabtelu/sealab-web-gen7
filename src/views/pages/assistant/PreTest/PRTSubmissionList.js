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
  ListGroupItem,
  Badge
} from "reactstrap"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswerList } from '@store/api/preTestAnswer'
import { useSkin } from "@hooks/useSkin"

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const PRTSubmissionList = () => {
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
      name: "Score",
      sortable: true,
      minWidth: '8rem',
      selector: (row) => row.prtScore,
      format: (row) => `${row.prtScore} pts`
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Pre Test' data={[{ title: 'Submission' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Pre Test Submission</CardTitle>
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
              expandableRowsComponent={({ data: { prtDetail } }) => {
                return (
                  <div className='expandable-content p-2'>
                    {
                      <ListGroup>
                        {
                          prtDetail.map((item, index) => {
                            return <ListGroupItem key={index} >
                              <div className="d-flex">
                                <div>
                                  <Badge color='primary' pill className='me-1'>
                                    {index + 1}
                                  </Badge>
                                </div>
                                <span dangerouslySetInnerHTML={{ __html: item.question }}></span>
                              </div>
                              <div className='d-flex justify-content-between w-100'>
                                <h5><strong>Jawab: </strong> {item.answer}</h5>
                                <div>
                                  <Badge color={item.verdict === "Correct" ? "success" : "danger"} pill>
                                    {item.verdict}
                                  </Badge>
                                </div>
                              </div>
                            </ListGroupItem>
                          })
                        }
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

export default PRTSubmissionList
