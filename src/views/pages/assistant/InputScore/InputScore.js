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
  Input
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

  const { groupDetail, moduleOptions } = useSelector(state => state.seelabs)

  const defaultValues = {

    module: moduleOptions[0],
    date: new Date(),
    scores: groupDetail.map((item) => {
      return {
        uid: item.uid,
        ta: 0,
        tp: 0,
        d: 0,
        i1: 0,
        i2: 0
      }
    })
  }

  const {
    control,
    getValues,
    handleSubmit
  } = useForm({ defaultValues })

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

  // //reset counter 
  // const reset = () =>{
  //     setCounter(0)
  // }

  const onSubmit = (data) => {
    dispatch(inputScore(data))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Input Nilai</CardTitle>
      </CardHeader>

      <CardBody>
        <Row className="gapy-4">
          {/* PDF SIDE */}
          <Col className="gapx-1" md='5' sm='12'>
            {/* TP/JURNAL */}
            <Row className="row-input-score">
              <Col md='8'>
                <Label className='form-label'>Pilih File</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={fileOptions[1]}
                  name='clear'
                  options={fileOptions}
                  isClearable
                />
              </Col>
              {/* FIND BUTTON */}
              <Col>
                <Button.Ripple color='primary'>Find</Button.Ripple>
              </Col>
            </Row>

            {/* NEXT STATE */}
            <Row>
              <Col className="next-state">
                <Button.Ripple className='next-state-button' color='primary' onClick={decrease}>Prev</Button.Ripple>
                <Button.Ripple className='next-state-button' color='primary' onClick={increase}>Next</Button.Ripple>
              </Col>
            </Row>

            {/* PDF */}
            <Row>
              {/* { counter &&  */}
              <embed id="PdfContainer" src={PdfURL[counter].url} type="application/pdf"></embed>
              {/* } */}
            </Row>
          </Col>

          {/* INPUT SIDE */}
          <Col className="object-center" md='6' sm='12'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* INPUT FIELD */}
              <Row className='row-input-score'>
                {/* PILIH MODUL FIELD */}
                <Col className='mb-1' md='4' sm='12'>
                  <Label className='form-label'>Pilih Modul</Label>
                  <Controller
                    name='module'
                    control={control}
                    render={({ field }) => (
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        name='clear'
                        options={moduleOptions}
                        isClearable
                        {...field}
                      />
                    )}
                  />
                </Col>
                {/* DATE PICKER FIELD */}
                <Col className='mb-1' md='4' sm='12'>
                  <Label className='form-label' for='default-picker'>
                    Default
                  </Label>
                  <Controller
                    name='date'
                    control={control}
                    render={({ field }) => (
                      <Flatpickr className='form-control'{...field} />
                    )}
                  />
                  {/* <PickerDefault /> */}
                </Col>
                {/* FIND BUTTON */}
                <Col className='mb-1' md='4' sm='12'>
                  <Button.Ripple color='primary'>Find</Button.Ripple>
                </Col>
              </Row>

              {/* TABEL */}
              {console.log(getValues())}
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
                                render={({ field }) => (
                                  <Input type='hidden' {...field} />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                name={`scores[${index}].ta`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="input-group-field-number text-center"
                                    placeholder="..."
                                    {...field} />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                name={`scores[${index}].tp`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="input-group-field-number text-center"
                                    placeholder="..."
                                    {...field} />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                name={`scores[${index}].d`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="input-group-field-number text-center"
                                    placeholder="..."
                                    {...field} />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                name={`scores[${index}].i2`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="input-group-field-number text-center"
                                    placeholder="..."
                                    {...field} />
                                )}
                              />
                            </td>
                            <td>
                              <Controller
                                name={`scores[${index}].i1`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="input-group-field-number text-center"
                                    placeholder="..."
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

              {/* SUBMIT */}
              <Row className="mt-2 gapx-1">
                {/* SUBMIT BUTTON*/}
                {/* <div className='form-check form-check-inline'>
                  <Input type='checkbox' id='basic-cb-checked' />
                  <Label for='basic-cb-checked' className='form-check-label'>
                    Data input sudah benar
                  </Label>
                </div> */}
                <Button.Ripple color='primary' type='submit'>Submit</Button.Ripple>
              </Row>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default InputScore
