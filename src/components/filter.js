// ** React Imports
import { useState, useEffect } from 'react'

// ** Reactstrap Imports
import Select from 'react-select'
import { Input, Label, Row, Col, Button, Collapse, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { getModules } from '@store/api/module'
import { Download, Filter, RefreshCw, Trash2 } from 'react-feather'

const TableFilter = ({ data, onFilterChange, isOpen }) => {
  // ** State
  const dispatch = useDispatch()
  const { modules, isLoading: isModuleLoading } = useSelector(state => state.module)
  const { dayOptions, shiftOptions } = useSelector(state => state.seelabs)
  const [searchName, setSearchName] = useState('')
  const [searchDay, setSearchDay] = useState(null)
  const [searchShift, setSearchShift] = useState(null)
  const [searchGroup, setSearchGroup] = useState('')
  const [searchModule, setSearchModule] = useState(null)

  useEffect(() => {
    dispatch(getModules())
  }, [])

  useEffect(() => {
    let updatedData = []
    const isOnSearch = searchName.length || searchDay || searchShift || searchGroup.length || searchModule
    updatedData = data.filter(({ idModule, studentInfo: { name, nim, day, shift, group } }) => {
      const isNameOnSearch = !searchName.length ||
        name.toLowerCase().includes(searchName.toLowerCase()) ||
        nim.toLowerCase().includes(searchName.toLowerCase())
      const isDayOnSearch = !searchDay || day === searchDay.value
      const isShiftOnSearch = !searchShift || shift === searchShift.value
      const isGroupOnSearch = !searchGroup.length || group.toString() === searchGroup
      const isModuleOnSearch = !searchModule || idModule === searchModule.value
      return isNameOnSearch && isDayOnSearch && isShiftOnSearch && isGroupOnSearch && isModuleOnSearch
    })
    onFilterChange(isOnSearch ? [...updatedData] : data)
  }, [data, searchName, searchDay, searchShift, searchGroup, searchModule])

  const reset = () => {
    setSearchName('')
    setSearchModule(null)
    setSearchDay(null)
    setSearchShift(null)
    setSearchGroup('')
  }

  return (
    <Collapse isOpen={isOpen}>
      <Row className='mt-1 mb-50 align-items-end'>
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
            onWheel={(e) => e.target.blur()}
            onChange={e => { setSearchGroup(e.target.value) }}
          />
        </Col>
        <Col lg='4' md='6' className='mb-1'>
          <Button.Ripple className='btn-icon rounded-circle' outline color='danger' onClick={() => reset()}>
            <Trash2 size={16} />
          </Button.Ripple>
        </Col>
      </Row>
    </Collapse>
  )
}

export default TableFilter

export const FilterToggle = ({ value, onToggle }) => (
  <Button.Ripple color='primary' outline onClick={() => onToggle(!value)}>
    <Filter size={16} />
    <span className='ms-25'>Filter Settings</span>
  </Button.Ripple>
)

export const DownloadProgress = ({ progress: { progress, total, loaded } }) => {
  return progress && (
    <div className='mb-2'>
      <div className='d-flex justify-content-between'>
        <span>Downloading file do not close this page!</span>
        <span>{`${loaded}MB/${total}MB (${progress}%)`}</span>
      </div>
      <Progress striped className='progress-bar-success' value={progress} />
    </div>
  )
}

export const RefreshButton = ({ disabled, onClickHandler }) => {
  const dispatch = useDispatch()

  return (
    <Button.Ripple color='primary' outline disabled={disabled} onClick={() => dispatch(onClickHandler())}>
      <RefreshCw size={16} />
    </Button.Ripple>
  )
}

export const DownloadButton = ({ disabled, onClickHandler, onDownload }) => {
  const { modules, isLoading: isModuleLoading } = useSelector(state => state.module)
  const dispatch = useDispatch()

  const onDownloadHandler = (progressEvent) => {
    onDownload({
      loaded: (progressEvent.loaded / (1024 * 1024)).toFixed(2),
      total: (progressEvent.total / (1024 * 1024)).toFixed(2),
      progress: (progressEvent.progress * 100).toFixed(2)
    })
  }

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color='primary' outline caret disabled={isModuleLoading || disabled}>
        <Download size={16} />
      </DropdownToggle>
      <DropdownMenu>
        {
          modules.map(({ id, seelabsId }) => (<DropdownItem tag='div' key={id} onClick={() => { dispatch(onClickHandler({ module: seelabsId, onDownload: onDownloadHandler })) }}>Module {seelabsId}</DropdownItem>))
        }
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export const baseColumns = [
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
  }
]