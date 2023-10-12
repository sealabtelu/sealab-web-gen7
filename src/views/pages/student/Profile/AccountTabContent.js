// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Demo Components
import SecurityTabContent from './SecurityTabContent'

const dayOptions = [
  { value: 'senin', label: 'Senin' },
  { value: 'selasa', label: 'Selasa' },
  { value: 'rabu', label: 'Rabu' },
  { value: 'kamis', label: 'Kamis' },
  { value: 'jumat', label: 'Jumat' },
  { value: 'sabtu', label: 'Sabtu' }
]

const shiftOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
]

// const AccountTabs = ({ data }) => {
const AccountTabs = () => {
  // ** Hooks
  const defaultValues = {
    lastName: '',
    // firstName: data.fullName.split(' ')[0]
    firstName: ''
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>
        <CardBody className='my-25'>
          {/* <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Upload
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Reset
                </Button>
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div> */}
          <Form className='pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* USERNAME */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <Input id='username' placeholder='Budi' invalid={errors.firstName && true} {...field} />
                  )}
                />
                {errors && errors.firstName && <FormFeedback>Please enter a valid Username</FormFeedback>}
              </Col>
              {/* KELOMPOK */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phNumber'>
                  Kelompok
                </Label>
                <Cleave
                  id='kelompok'
                  name='kelompok'
                  className='form-control'
                  placeholder='48'
                />
              </Col>
              {/* HARI */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='hari'>
                  Hari
                </Label>
                <Select
                  id='hari'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={dayOptions}
                  theme={selectThemeColors}
                  defaultValue={dayOptions[0]}
                />
              </Col>
              {/* SHIFT */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='shift'>
                  Shift
                </Label>
                <Select
                  id='shift'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={shiftOptions}
                  theme={selectThemeColors}
                  defaultValue={shiftOptions[0]}
                />
              </Col>
              {/* KELAS */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='kelas'>
                  Kelas
                </Label>
                <Controller
                  name='kelas'
                  control={control}
                  render={({ field }) => (
                    <Input id='kelas' placeholder='TK-45-02' invalid={errors.firstName && true} {...field} />
                  )}
                />
                {errors && errors.firstName && <FormFeedback>Please enter a valid Class</FormFeedback>}
              </Col>
              {/* PHONE NUMBER */}
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phNumber'>
                  Number
                </Label>
                <Cleave
                  id='phNumber'
                  name='phNumber'
                  className='form-control'
                  placeholder='1 234 567 8900'
                  options={{ phone: true, phoneRegionCode: 'ID' }}
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <DeleteAccount /> */}
      <SecurityTabContent />
    </Fragment>
  )
}

export default AccountTabs
