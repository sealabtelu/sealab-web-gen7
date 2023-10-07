// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { useState } from "react"

// ** Third Party Components
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

// ** Utils
import { selectThemeColors } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row, Col,
  Label,
  Button,
  Table,
  Form,
  Input,
  Spinner
} from 'reactstrap'

import { useDispatch, useSelector } from 'react-redux'
import { inputScore } from '@store/api/seelabs'

const fileOptions = [
  { value: 'jurnal', label: 'Jurnal' },
  { value: 'tp', label: 'Tugas Pendahuluan' }
]

const PdfURL = [
  { id: 1, url: "https://pdfobject.com/pdf/sample.pdf" },
  { id: 2, url: "https://www.africau.edu/images/default/sample.pdf" },
  { id: 3, url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" }
]

const InputScore = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    groupDetail,
    moduleOptions,
    isLoading,
    isSubmitLoading
  } = useSelector(state => state.seelabs)

  const {
    control,
    handleSubmit
  } = useForm()

  const [counter, setCounter] = useState(0)

  //increase counter
  const increase = () => {
    if (counter < PdfURL.length - 1) {
      setCounter(count => count + 1)
    }
  }

  //decrease counter
  const decrease = () => {
    if (counter > 0) {
      setCounter(count => count - 1)
    }
  }

  const onSubmit = (data) => {
    dispatch(inputScore(data)).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate('/assistant/select-group')
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Nilai</CardTitle>
      </CardHeader>

      <CardBody>
        <Row className="gapy-4">

          {/* INPUT SIDE */}
          <Col className="object-center" sm='12'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* INPUT FIELD */}
              <Row className='row-input-score'>
                {/* PILIH MODUL FIELD */}
                <Col className='mb-1' md='4' sm='12'>
                  <Label className='form-label'>Select Module</Label>
                  <Controller
                    name='module'
                    control={control}
                    defaultValue={moduleOptions[0]}
                    render={({ field }) => (
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        name='clear'
                        options={moduleOptions}
                        isClearable
                        disabled={isLoading || isSubmitLoading}
                        {...field}
                      />
                    )}
                  />
                </Col>
              </Row>

              {isLoading ? (
                <div className='d-flex justify-content-center my-1'>
                  <Spinner />
                </div>
              ) : (
                <Row>
                  <Table responsive>
                    <thead>
                      <tr>
                        {/* <th>Group</th> */}
                        <th>Name</th>
                        <th>TA</th>
                        <th>TP</th>
                        <th>D</th>
                        <th>I1</th>
                        <th>I2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        groupDetail.map((item, index) => {
                          return (
                            <tr key={index}>
                              {/* {i === 0 && <td rowSpan={groupDetail.length} scope="row">32</td>} */}
                              <td>
                                {item.name}
                                <Controller
                                  name={`scores[${index}].uid`}
                                  control={control}
                                  defaultValue={item.uid}
                                  render={({ field }) => (
                                    <Input type='hidden' {...field} />
                                  )}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`scores[${index}].ta`}
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      min="0" max="100"
                                      className="input-group-field-number text-center"
                                      placeholder="..."
                                      disabled={isLoading || isSubmitLoading}
                                      {...field} />
                                  )}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`scores[${index}].tp`}
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      min="0" max="100"
                                      className="input-group-field-number text-center"
                                      placeholder="..."
                                      disabled={isLoading || isSubmitLoading}
                                      {...field} />
                                  )}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`scores[${index}].d`}
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      min="0" max="100"
                                      className="input-group-field-number text-center"
                                      placeholder="..."
                                      disabled={isLoading || isSubmitLoading}
                                      {...field} />
                                  )}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`scores[${index}].i1`}
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      min="0" max="100"
                                      className="input-group-field-number text-center"
                                      placeholder="..."
                                      disabled={isLoading || isSubmitLoading}
                                      {...field} />
                                  )}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`scores[${index}].i2`}
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      min="0" max="100"
                                      className="input-group-field-number text-center"
                                      placeholder="..."
                                      disabled={isLoading || isSubmitLoading}
                                      {...field} />
                                  )}
                                />
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </Row>
              )}

              {/* SUBMIT */}
              <Row className="mt-2 gapx-1">
                <Button.Ripple color='primary' type='submit' disabled={isLoading || isSubmitLoading}>
                  {isSubmitLoading && <Spinner color='light' size='sm' />}
                  <span className='align-middle'>Update</span>
                </Button.Ripple>
              </Row>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default InputScore
