// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import Select from "react-select"
import toast from "react-hot-toast"
import { useForm, Controller } from "react-hook-form"
import { getUserData, selectThemeColors } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import { editStudent } from "@store/api/user"

import Cleave from "cleave.js/react"
import 'cleave.js/dist/addons/cleave-phone.id'

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

const AccountTabContent = ({ loading }) => {
  const dispatch = useDispatch()
  // ** Hooks
  const { dayOptions, shiftOptions } = useSelector((state) => state.seelabs)
  const defaultValues = {
    id: getUserData().idStudent,
    username: getUserData().username,
    group: getUserData().group,
    day: dayOptions[getUserData().day - 1],
    shift: shiftOptions[getUserData().shift - 1],
    classroom: getUserData().classroom ?? '',
    phone: getUserData().phone ?? ''
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    dispatch(editStudent({
      ...data,
      day: data.day.value,
      shift: data.shift.value
    }))
      .then(({ status }) => {
        if (status === 200) {
          toast.success("Update Successfully!")
        } else {
          toast.error("Update failed!")
        }
      })
      .catch(({ message }) => toast.error(message))
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Profile Details</CardTitle>
        </CardHeader>
        <CardBody className="my-25">
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
                      disabled={loading}
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
                <Label className="form-label" for="group">
                  Kelompok
                </Label>
                <Controller
                  name="group"
                  control={control}
                  rules={{ required: "Please fill group!" }}
                  render={({ field }) => (
                    <Input
                      disabled={loading}
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
                      isDisabled={loading}
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
                      isDisabled={loading}
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
                <Label className="form-label" >
                  Kelas
                </Label>
                <Controller
                  name="classroom"
                  control={control}
                  rules={{ required: "Please fill class!" }}
                  render={({ field }) => (
                    <Input
                      disabled={loading}
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
                <Label className="form-label">
                  Number
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Please fill phone!" }}
                  render={({ field }) => (
                    <Cleave
                      disabled={loading}
                      className={`form-control ${errors.phone && "is-invalid"}`}
                      placeholder='0812 3456 8900'
                      options={{ phone: true, phoneRegionCode: 'ID' }}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone && (
                  <FormFeedback>{errors.phone.message}</FormFeedback>
                )}
              </Col>

              <Col className="mt-1" sm="12">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading && <Spinner color="light" size="sm" />}
                  <span className="ms-50">Save Changes</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountTabContent
