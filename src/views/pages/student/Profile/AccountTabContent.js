// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import Select from "react-select"
import toast from "react-hot-toast"
import { useForm, Controller } from "react-hook-form"
import { getUserData, selectThemeColors } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import { editStudent } from "@store/api/user"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
  Spinner
} from "reactstrap"

// ** Demo Components
import SecurityTabContent from "./SecurityTabContent"

// const AccountTabs = ({ data }) => {
const AccountTabs = () => {
  const dispatch = useDispatch()
  // ** Hooks
  const { dayOptions, shiftOptions } = useSelector((state) => state.seelabs)
  const { isLoading } = useSelector((state) => state.user)
  const defaultValues = {
    ...getUserData(),
    id: getUserData().idStudent,
    day: dayOptions[getUserData().day - 1],
    shift: shiftOptions[getUserData().shift - 1]
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    dispatch(
      editStudent({ ...data, day: data.day.value, shift: data.shift.value })
    )
      .then(({ payload: { status } }) => {
        if (status === 200) {
          toast('Please relog to apply changes!', {
            icon: '📣'
          })
          toast.success("Update Successfully!")
        } else {
          // console.log(status);
          toast.error("Update failed!")
        }
      })
      .catch(() => toast.error("Unexpected Error!"))
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Profile Details</CardTitle>
        </CardHeader>
        <CardBody className="my-25">
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
          <Form className="pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* ID */}
              <Controller
                name="id"
                control={control}
                render={({ field }) => <Input type="hidden" {...field} />}
              />
              {/* USERNAME */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Please fill username!" }}
                  render={({ field }) => (
                    <Input
                      placeholder="Username"
                      invalid={errors.username && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.username && (
                  <FormFeedback>{errors.username.message}</FormFeedback>
                )}
              </Col>
              {/* KELOMPOK */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phNumber">
                  Kelompok
                </Label>
                <Controller
                  name="group"
                  control={control}
                  rules={{ required: "Please fill group!" }}
                  render={({ field }) => (
                    <Input
                      placeholder="Group"
                      invalid={errors.group && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.group && (
                  <FormFeedback>{errors.group.message}</FormFeedback>
                )}
              </Col>
              {/* HARI */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="hari">
                  Hari
                </Label>
                <Controller
                  name="day"
                  control={control}
                  rules={{ required: "Please fill day!" }}
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={dayOptions}
                      isClearable
                      {...field}
                    />
                  )}
                />
                {errors && errors.day && (
                  <FormFeedback>{errors.day.message}</FormFeedback>
                )}
              </Col>
              {/* SHIFT */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="shift">
                  Shift
                </Label>
                <Controller
                  name="shift"
                  control={control}
                  rules={{ required: "Please fill shift!" }}
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={shiftOptions}
                      isClearable
                      {...field}
                    />
                  )}
                />
                {errors && errors.shift && (
                  <FormFeedback>{errors.shift.message}</FormFeedback>
                )}
              </Col>
              {/* KELAS */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="kelas">
                  Kelas
                </Label>
                <Controller
                  name="classroom"
                  control={control}
                  rules={{ required: "Please fill class!" }}
                  render={({ field }) => (
                    <Input
                      id="kelas"
                      placeholder="TK-45-02"
                      invalid={errors.classroom && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.classroom && (
                  <FormFeedback>{errors.classroom.message}</FormFeedback>
                )}
              </Col>
              {/* PHONE NUMBER */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phNumber">
                  Number
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="08xxxxxx"
                      invalid={errors.firstName && true}
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col className="mt-1" sm="12">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner color="light" size="sm" />}
                  <span className="ms-50">Save Changes</span>
                </Button>
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
