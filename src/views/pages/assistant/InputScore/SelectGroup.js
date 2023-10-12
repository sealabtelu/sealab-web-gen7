// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'

// ** Utils
import { useSkin } from "@hooks/useSkin"
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, getGroupDetail } from '@store/api/seelabs'

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const SelectGroup = () => {
  const dispatch = useDispatch()
  const { skin } = useSkin()

  const {
    groups,
    dayOptions,
    shiftOptions,
    currentDSG,
    isLoading } = useSelector(state => state.seelabs)

  const {
    control,
    handleSubmit
  } = useForm()

  const onSubmit = ({ day, shift }) => {
    dispatch(getGroupList(
      {
        day: day.value,
        shift: shift.value
      }
    ))
  }
  const basicColumns = [
    {
      name: 'Group',
      maxWidth: '150px',
      center: true,
      selector: row => row.idGroup
    },
    {
      name: 'Names',
      minWidth: '300px',
      cell: row => (
        <ListGroup flush style={{ width: '100%' }}>
          {row.names.map((name, index) => (
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
      name: 'Action',
      button: true,
      minWidth: '300px',
      cell: row => (
        <NavLink to="/assistant/select-group/input-score">
          <Button.Ripple
            color='primary'
            disabled={isLoading}
            onClick={() => dispatch(getGroupDetail({ ...currentDSG, group: row.idGroup }))}
          >
            Input
          </Button.Ripple>
        </NavLink>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Select Group</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='row-input-score'>
            <Col className='mb-1' md='4' sm='12'>
              <Label className='form-label'>Select Day</Label>
              <Controller
                name='day'
                control={control}
                defaultValue={dayOptions[currentDSG.day - 1]}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={dayOptions}
                    isClearable
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col className='mb-1' md='4' sm='12'>
              <Label className='form-label'>Select Shift</Label>
              <Controller
                name='shift'
                control={control}
                defaultValue={shiftOptions[currentDSG.shift - 1]}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={shiftOptions}
                    isClearable
                    disabled={isLoading}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col className='mb-1' md='4' sm='12'>
              <Button.Ripple color='primary' type='submit' disabled={isLoading}>Find</Button.Ripple>
            </Col>
          </Row>
        </Form>
        <Row>
          <div className='react-dataTable my-1'>
            <DataTable
              responsive
              striped
              highlightOnHover
              noHeader
              progressPending={isLoading}
              data={groups}
              columns={basicColumns}
              theme={skin}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              progressComponent={
                <div className='d-flex justify-content-center my-1'>
                  <Spinner color='primary' />
                </div>
              }
            />
          </div>
        </Row>
      </CardBody>
    </Card>
  )
}
export default SelectGroup
