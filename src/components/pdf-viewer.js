// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import Select from 'react-select'
import { Button, Card, CardHeader, CardTitle, CardBody, Label, Row, Col, Alert, Badge } from 'reactstrap'
import { selectThemeColors } from '@utils'
import { AlertCircle } from 'react-feather'

const options = [
  { value: 'paFilePath', label: 'Home Assignment' },
  { value: 'jFilePath', label: 'Journal' }
]

const PDFViewer = ({ data }) => {

  // ** State
  const [counter, setCounter] = useState(0)
  const [fileOption, setFileOption] = useState(options[0])
  const [selectedFileOption, setSelectedFileOption] = useState(options[0].value)

  //increase counter
  const increase = () => {
    const pdfCount = data.length - 1 //data.filter(item => item[selectedFileOption] !== null).length - 1
    if (counter < pdfCount) setCounter(count => count + 1)
  }

  //decrease counter
  const decrease = () => {
    if (counter > 0) setCounter(count => count - 1)
  }

  return (
    <Fragment>
      {
        data.length > 0 &&
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>PDF View</CardTitle>
          </CardHeader>

          <CardBody>
            <Row>
              <Col md='6' sm='12'>
                <Label className='form-label'>Select File</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  value={fileOption}
                  options={options}
                  onChange={(e) => {
                    setCounter(0)
                    setFileOption(e)
                    setSelectedFileOption(e.value)
                  }}
                />
              </Col>
            </Row>

            {/* NEXT STATE */}
            <Row>
              <div className='d-flex justify-content-between align-items-center my-1'>
                <Button.Ripple color='primary' onClick={decrease}>Prev</Button.Ripple>
                {data[counter].name}
                <Button.Ripple color='primary' onClick={increase}>Next</Button.Ripple>
              </div>
            </Row>

            <Alert color='danger' isOpen={data[counter][selectedFileOption] === null}>
              <div className='alert-body'>
                <AlertCircle size={15} />
                <span className='ms-1'>
                  File <strong>Unavailable</strong>.
                </span>
              </div>
            </Alert>
            {/* PDF */}
            <Row>
              <embed
                className='PdfContainer'
                // onLoad={(e) => console.log(e)}
                src={data[counter][selectedFileOption]}
                type='application/pdf'
              />
            </Row>
          </CardBody>
        </Card>
      }
    </Fragment>
  )
}

export default PDFViewer
