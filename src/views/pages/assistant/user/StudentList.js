// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'


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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap"

// ** Third Party Components
import { ChevronDown, Plus, MoreVertical, FileText, Archive, Trash, Edit } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from '@store/api/user'
import { useSkin } from "@hooks/useSkin"

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const Tables = () => {
  // ** state
  const [modal, setModal] = useState(false)

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { students, isLoading } = useSelector(state => state.user)

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
      name: 'Group',
      sortable: true,
      minWidth: '150px',
      selector: row => `Kelompok ${row.group}`
    },
    {
      name: 'Class',
      sortable: true,
      selector: row => row.classroom
    },
    {
      name: 'Phone',
      sortable: true,
      minWidth: '150px',
      selector: row => row.phone
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: () => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>Details</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Archive size={15} />
                  <span className='align-middle ms-50'>Archive</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Student' data={[{ title: 'Datatables' }, { title: 'Datatables Basic' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Student List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Record</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              data={students}
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
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export default Tables
