// ** Styles
import "../../../../assets/scss/pilih-group.scss"
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import Select from 'react-select'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Button, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Input } from 'reactstrap'

// ** Demo Components
import PickerDefault from './PickerDefault'
import { useState } from "react"

const fileOptions = [
  { value: 'jurnal', label: 'Jurnal' },
  { value: 'tp', label: 'Tugas Pendahuluan' }
]

const moduleOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' }
]

const PdfURL = [
  { id: 1, url: "https://pdfobject.com/pdf/sample.pdf" },
  { id: 2, url: "https://www.africau.edu/images/default/sample.pdf" },
  { id: 3, url: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" }
]

const groupName = [
  {
    uid: "39528",
    name: "DANNY HAMTAR PANGESTU"
  },
  {
    uid: "39245",
    name: "MUHAMAD AFRI MARLIANSYAH"
  },
  {
    uid: "39550",
    name: "PARIKESIT"
  },
  {
    uid: "39542",
    name: "RAIHANA FAWAZ"
  }
]

const InputNilai = () => {
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
              <iframe id="PdfContainer" src={PdfURL[counter].url}></iframe>
              {/* } */}
            </Row>
          </Col>

          {/* INPUT SIDE */}
          <Col className="object-center" md='6' sm='12'>
            {/* INPUT FIELD */}
            <Row className='row-input-score'>
              {/* PILIH MODUL FIELD */}
              <Col className='mb-1' md='4' sm='12'>
                <Label className='form-label'>Pilih Modul</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={moduleOptions[1]}
                  name='clear'
                  options={moduleOptions}
                  isClearable
                />
              </Col>
              {/* DATE PICKER FIELD */}
              <Col className='mb-1' md='4' sm='12'>
                <PickerDefault />
              </Col>
              {/* FIND BUTTON */}
              <Col className='mb-1' md='4' sm='12'>
                <Button.Ripple color='primary'>Find</Button.Ripple>
              </Col>
            </Row>

            {/* TABEL */}
            <Row>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Name</th>
                    <th>TA</th>
                    <th>TP</th>
                    <th>Jurnal</th>
                    <th>Keaktifan</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    groupName.map((item, i) => {
                      if (i === 0) {
                        return (
                          <tr key={i}>
                            <td rowSpan={groupName.length} scope="row">32</td>
                            <td>{item.name}</td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                          </tr>
                        )
                      } else {
                        return (
                          <tr key={i}>
                            <td>{item.name}</td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                            <td>
                              <input type="number" min="0" max="100" className="input-group-field-number text-center" placeholder="..." />
                            </td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </Table>
            </Row>

            {/* SUBMIT */}
            <Row className="mt-2 gapx-1">
              {/* SUBMIT BUTTON*/}
              <div className='form-check form-check-inline'>
                <Input type='checkbox' id='basic-cb-checked' />
                <Label for='basic-cb-checked' className='form-check-label'>
                  Data input sudah benar
                </Label>
              </div>
              <Button.Ripple color='primary'>Submit</Button.Ripple>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default InputNilai
