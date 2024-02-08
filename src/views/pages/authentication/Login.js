// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Actions
import { login, handleLogin } from "@store/api/user"

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from "@components/input-password-toggle"

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import {
  Form,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  FormFeedback,
  Spinner
} from "reactstrap"

// ** Illustrations Imports
import logo from "@src/assets/images/logo/logo.png"

// ** Styles
import "@styles/react/pages/page-authentication.scss"

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role}. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // const [isLoading, setIsLoading] = useState(false)
  const { isLoading } = useSelector((state) => state.user)


  const onSubmit = async ({ username, password }) => {
    dispatch(login({ username, password })).unwrap()
      .then(res => {
        const data = { ...res.data.data, appToken: res.data.data.appToken }
        dispatch(handleLogin(data))
        navigate(getHomeRouteForLoggedInUser(data.role))
        toast(t => (
          <ToastContent t={t} role={data.role} name={data.name || data.username || 'Unknown'} />
        ))
      })
      .catch(({ data, status }) => {
        if (status === 404) {
          setError('username', {
            type: 'manual',
            message: data.message
          })
        } else if (status === 401) {
          setError('password', {
            type: 'manual',
            message: data.message
          })
        } else {
          console.log(err)
        }
      })
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/'>
              <img style={{ width: 'auto', height: '50px' }} src={logo} alt="I-Smile" />
              {/* <h2 className="brand-text text-primary ms-1">I-Smile</h2> */}
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to SEA Laboratory!
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label'>
                  Email
                </Label>
                <Controller
                  name='username'
                  control={control}
                  disabled={isLoading}
                  defaultValue=''
                  rules={{ required: "Username cannot be null" }}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='NIM or Username SSO'
                      invalid={errors.username && true}
                      {...field} />
                  )}
                />
                {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                {/* <div className='d-flex justify-content-between'>
                  <Link to='/pages/forgot-password-basic'>
                    <small>Forgot Password?</small>
                  </Link>
                </div> */}
                <Label className='form-label'>
                  Password
                </Label>
                <Controller
                  name='password'
                  control={control}
                  disabled={isLoading}
                  defaultValue=''
                  rules={{ required: "Password cannot be null" }}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field} />
                  )}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </div>
              {/* <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div> */}
              <Button className='mt-2' type='submit' color="primary" block disabled={isLoading}>
                {isLoading && <Spinner color='light' size='sm' />}
                <span className='ms-50'>Sign in</span>
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
