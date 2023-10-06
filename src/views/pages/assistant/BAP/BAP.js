// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ChevronDown } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import DataTable from 'react-data-table-component'

// ** Utils
import { formatUTCtoLocale } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBAP } from '@store/api/seelabs'

const BAP = () => {
  const dispatch = useDispatch()
  const { bap, isLoading } = useSelector(state => state.seelabs)

  const {
    control,
    handleSubmit
  } = useForm()

  useEffect(() => {
    dispatch(getBAP())
  }, [])

  const onSubmit = ({ date }) => {
    dispatch(getBAP(formatUTCtoLocale(date)))
  }

  const basicColumns = [
    {
      name: 'Date',
      selector: row => row.date
    },
    {
      name: 'Module',
      selector: row => row.module
    },
    {
      name: 'Shift',
      selector: row => row.shift
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>BAP</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='row-input-score'>
            <Col className='mb-1' md='4' sm='12'>
              <Label className='form-label' for='default-picker'>Pilih tanggal awal jaga</Label>
              <Controller
                name='date'
                control={control}
                defaultValue={[new Date()]}
                render={({ field }) => (
                  <Flatpickr
                    className='form-control'
                    disabled={isLoading}
                    {...field} />
                )}
              />
            </Col>
            <Col className='mb-1' md='4' sm='12'>
              <Button.Ripple color='primary' type='submit' disabled={isLoading}>Find</Button.Ripple>
            </Col>
          </Row>
        </Form>
        <Row>
          {isLoading ? (
            <div className='d-flex justify-content-center my-1'>
              <Spinner />
            </div>
          ) : (
            <div className='react-dataTable my-1'>
              <DataTable
                noHeader
                pagination
                data={bap}
                columns={basicColumns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </div>
          )}
        </Row>
      </CardBody>
    </Card>
  )
}
export default BAP
