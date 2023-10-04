// ** Styles
import '@src/assets/scss/pilih-group.scss'

// ** Third Party Components
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, getGroupDetail } from '@store/api/seelabs'

const SelectGroup = () => {
  const dispatch = useDispatch()

  const {
    groups,
    dayOptions,
    shiftOptions,
    isLoading } = useSelector(state => state.seelabs)

  const defaultValues = {
    day: dayOptions[0],
    shift: shiftOptions[0]
  }

  const {
    control,
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = ({ day, shift }) => {
    dispatch(getGroupList(
      {
        day: day.value,
        shift: shift.value
      }
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Pilih Group</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='row-input-score'>
            <Col className='mb-1' md='4' sm='12'>
              <Label className='form-label'>Select Day</Label>
              <Controller
                name='day'
                control={control}
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={dayOptions}
                    isClearable
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
                render={({ field }) => (
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={shiftOptions}
                    isClearable
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
          <Table responsive>
            <thead>
              <tr>
                <th>Group</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isObjEmpty(groups) && !isLoading &&
                groups.map((item) => {
                  return item.names.map((name, index) => {
                    return (
                      <tr key={index}>
                        {index === 0 && <td rowSpan={item.names.length} scope="row">{item.idGroup}</td>}
                        <td>{name}</td>
                        {index === 0 &&
                          <td rowSpan={item.names.length} scope="row">
                            <NavLink to="/assistant/pilih-group/input-nilai">
                              <Button.Ripple color='primary' disabled={isLoading} onClick={() => dispatch(getGroupDetail(item.idGroup))}>Input</Button.Ripple>
                            </NavLink>
                          </td>
                        }
                      </tr>
                    )
                  })
                })
              }
            </tbody>
          </Table>
        </Row>
        {isLoading && (
          <div className='d-flex justify-content-center my-1'>
            <Spinner />
          </div>
        )}
      </CardBody>
    </Card>
  )
}
export default SelectGroup
