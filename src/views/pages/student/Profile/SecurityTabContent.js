// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changePassword, handleLogout } from "@store/api/user"

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import toast from 'react-hot-toast'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  oldPassword: '',
  retypeNewPassword: ''
}

const SecurityTabContent = ({ loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const SignupSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, obj => showErrors('Old Password', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .min(8, obj => showErrors('New Password', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(8, obj => showErrors('Retype New Password', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      dispatch(changePassword(data)).unwrap()
        .then(({ status }) => {
          if (status === 200) {
            dispatch(handleLogout())
            navigate('/login')
            toast.success("Password Changed!")
          } else {
            toast.error("Update failed!")
          }
        })
        .catch(({ message }) => toast.error(message))
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
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='oldPassword'
                  name='oldPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Old Password'
                      htmlFor='oldPassword'
                      className='input-group-merge'
                      disabled={loading}
                      invalid={errors.oldPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.oldPassword && (
                  <FormFeedback className='d-block'>{errors.oldPassword.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='newPassword'
                  name='newPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='New Password'
                      htmlFor='newPassword'
                      className='input-group-merge'
                      disabled={loading}
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='retypeNewPassword'
                  name='retypeNewPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Retype New Password'
                      htmlFor='retypeNewPassword'
                      className='input-group-merge'
                      disabled={loading}
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className='d-block'>{errors.retypeNewPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - the more, the better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' disabled={loading} loading={loading} className='me-1' color='primary'>
                  Save changes
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTabContent
