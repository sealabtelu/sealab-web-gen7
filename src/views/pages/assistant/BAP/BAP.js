// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

// ** Utils
import { isObjEmpty, formatUTCtoLocale } from '@utils'

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
                    // options={{ enableTime: false }}
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
          <Table responsive>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Modul</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {!isObjEmpty(bap) && !isLoading &&
                bap.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.date}</td>
                      <td>{item.module}</td>
                      <td>{item.shift}</td>
                    </tr>
                  )
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
export default BAP
