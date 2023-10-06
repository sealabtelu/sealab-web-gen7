// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from '@store/api/user'

const Tables = () => {
  const dispatch = useDispatch()
  const { students } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getStudents())
  }, [])

  const basicColumns = [
    {
      name: 'NIM',
      sortable: true,
      selector: row => row.nim
    },
    {
      name: 'Name',
      sortable: true,
      minWidth: '225px',
      selector: row => row.name
    },
    {
      name: 'Group',
      sortable: true,
      minWidth: '175px',
      selector: row => `Kelompok ${row.group}`
    },
    {
      name: 'Day',
      sortable: true,
      selector: row => {
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        return days[row.day - 1]
      }
    },
    {
      name: 'Shift',
      sortable: true,
      selector: row => `Shift ${row.shift}`
    },
    {
      name: 'Phone',
      sortable: true,
      selector: row => row.phone
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Student' data={[{ title: 'Datatables' }, { title: 'Datatables Basic' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Student List</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              data={students}
              columns={basicColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Tables
