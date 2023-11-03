// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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
  Input,
  Row,
  Col,
  Label
} from "reactstrap"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'
import Select from 'react-select'
import moment from 'moment/moment'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswerList } from '@store/api/homeAssignmentAnswer'
import { getModules } from '@store/api/module'
import { useSkin } from "@hooks/useSkin"
import { NavLink } from 'react-router-dom'

import { selectThemeColors } from '@utils'

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
  const { modules, isLoading: isModuleLoading } = useSelector(state => state.module)
  const { dayOptions, shiftOptions } = useSelector(state => state.seelabs)
  const [searchName, setSearchName] = useState('')
  const [searchDay, setSearchDay] = useState(null)
  const [searchShift, setSearchShift] = useState(null)
  const [searchGroup, setSearchGroup] = useState('')
  const [searchModule, setSearchModule] = useState(null)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    dispatch(getAnswerList())
    dispatch(getModules())
  }, [])

  useEffect(() => {
    let updatedData = []
    updatedData = answers.filter(({ idModule, studentInfo: { name, nim, day, shift, group } }) => {
      console.log({searchGroup, group})
      const isNameOnSearch = !searchName.length ||
        name.toLowerCase().includes(searchName.toLowerCase()) ||
        nim.toLowerCase().includes(searchName.toLowerCase())
      const isDayOnSearch = !searchDay || day === searchDay.value
      const isShiftOnSearch = !searchShift || shift === searchShift.value
      const isGroupOnSearch = !searchGroup.length || group.toString() === searchGroup
      const isModuleOnSearch = !searchModule || idModule === searchModule.value
      return isNameOnSearch && isDayOnSearch && isShiftOnSearch && isGroupOnSearch && isModuleOnSearch
    })
    setFilteredData([...updatedData])
  }, [searchName, searchDay, searchShift, searchGroup, searchModule])

  const dataToRender = () => {
    return searchName.length || searchDay || searchShift || searchGroup || searchModule ? filteredData : answers
  }

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
      selector: ({ studentInfo: row }) => row.day,
      format: ({ studentInfo: row }) => {
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        return days[row.day - 1]
      }
    },
    {
      name: 'Shift',
      sortable: true,
      minWidth: '8rem',
      selector: ({ studentInfo: row }) => row.shift,
      format: ({ studentInfo: row }) => `Shift ${row.shift}`
    },
    {
      name: 'Group',
      sortable: true,
      minWidth: '9rem',
      selector: ({ studentInfo: row }) => row.group,
      format: ({ studentInfo: row }) => `Group ${row.group}`
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
      format: (row) => moment(row.submitTime).utc().format("ddd DD MMM YYYY HH:mm A")
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
      <Breadcrumbs title='Home Assignment' data={[{ title: 'Submission' }]} />
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Home Assignment Submission</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Name/NIM:
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Bruce Wayne'
                value={searchName}
                onChange={e => { setSearchName(e.target.value) }}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='day'>
                Day:
              </Label>
              <Select
                isClearable
                id='day'
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={dayOptions}
                value={searchDay}
                onChange={e => setSearchDay(e)}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='shift'>
                Shift:
              </Label>
              <Select
                isClearable
                id='shift'
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                options={shiftOptions}
                value={searchShift}
                onChange={e => setSearchShift(e)}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='group'>
                Group:
              </Label>
              <Input
                id='group'
                type='number'
                placeholder='1'
                value={searchGroup}
                onChange={e => { setSearchGroup(e.target.value) }}
              />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='module'>
                Module:
              </Label>
              <Select
                isClearable
                id='module'
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isLoading={isModuleLoading}
                options={modules.map(({ id, name }) => ({ value: id, label: name }))}
                value={searchModule}
                onChange={e => setSearchModule(e)}
              />
            </Col>
          </Row>

          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              data={dataToRender()}
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
