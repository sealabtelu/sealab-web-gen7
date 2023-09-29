// ** Styles
import "../../../../assets/scss/pilih-group.scss"

// ** Third Party Components
import Select from 'react-select'
import { NavLink } from 'react-router-dom'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Button, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const dayOptions = [
  { value: 'senin', label: 'Senin' },
  { value: 'selasa', label: 'Selasa' },
  { value: 'rabu', label: 'Rabu' },
  { value: 'kamis', label: 'Kamis' },
  { value: 'jumat', label: 'Jumat' },
  { value: 'sabtu', label: 'Sabtu' }
]

const shiftOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' }
]

const listGroup = [
  {
    id_group: 25,
    names: [
      "DANNY HAMTAR PANGESTU",
      "MUHAMAD AFRI MARLIANSYAH",
      "PARIKESIT",
      "RAIHANA FAWAZ"
    ]
  },
  {
    id_group: 26,
    names: [
      "ARIF MUHAMMAD LADUNI",
      "MUHAMAD HILMI HAIDAR",
      "NICHOLAS ALVITO DIANDRA",
      "TITO ALFARABI BIWARNO"
    ]
  },
  {
    id_group: 27,
    names: [
      "AHMAD FADLULLOH",
      "AZ - ZAHRA CHIKAL ERLIANDI",
      "KHALISHAH",
      "NABILA PUTRI RIHAN"
    ]
  },
  {
    id_group: 28,
    names: [
      "ANITA FIRDA NURALIFAH",
      "FERDINANT HUTAJULU",
      "M.JAMIL AL-MUNAWAR",
      "RAMZY ATHAYA MUHAMMAD"
    ]
  }
]

const PilihGroup = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Pilih Group</CardTitle>
      </CardHeader>

      <CardBody>
        <Row className='row-input-score'>
          <Col className='mb-1' md='4' sm='12'>
            <Label className='form-label'>Pilih Hari</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={dayOptions[1]}
              name='clear'
              options={dayOptions}
              isClearable
            />
          </Col>
          <Col className='mb-1' md='4' sm='12'>
            <Label className='form-label'>Pilih Shift</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={shiftOptions[1]}
              name='clear'
              options={shiftOptions}
              isClearable
            />
          </Col>
          <Col className='mb-1' md='4' sm='12'>
            <Button.Ripple color='primary'>Find</Button.Ripple>
          </Col>
        </Row>
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
              {
                listGroup.map((item) => {
                  return item.names.map((name, index) => {
                    return (
                      <tr key={index}>
                        {console.log(item.id_group)}
                        {index === 0 && <td rowSpan={item.names.length} scope="row">{item.id_group}</td>}
                        <td>{name}</td>
                        {index === 0 &&
                          <td rowSpan={item.names.length} scope="row">
                            <NavLink to="/assistant/pilih-group/input-nilai">
                              <Button.Ripple color='primary'>Input</Button.Ripple>
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
      </CardBody>
    </Card>
  )
}
export default PilihGroup
