import React, { useState } from "react"
import {
  Card,
  Button,
  Row,
  Form,
  Col,
  Collapse,
  CardBody,
  Label,
  Input,
  FormFeedback,
  Container
} from "reactstrap"

import { Upload } from "react-feather"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { addAnswer } from "@store/api/journalAnswer"

// ** Third Party Imports File Uploader
import { Controller, useForm } from "react-hook-form"
import Dropzone from "@custom-components/dropzone"

export default function PreTestOverlay({ moduleTitle, moduleNumber }) {
  //collase
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.journalAnswer)

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    dispatch(addAnswer({ ...data, file: data.file[0] })).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate("/student/journal")
      }
    })
  }

  return (
    <Card className="card-overlay-jurnal">
      {/* SUBMIT */}
      {/* <CardBody> */}
      <Container>
        <Row>
          <Col>
            {/* <h2>Tugas Pendahuluan</h2> */}
            <h3 className="title-overlay">
              <b>
                MODUL {moduleNumber}: {moduleTitle}
              </b>
            </h3>
            <p>
              <b>Due Date: </b> &nbsp;{" "}
            </p>
            <p>
              <b>Time Remaining:</b> &nbsp; 1 Hour 23 Min
            </p>
            <p>
              <b>Time Submitted:</b> &nbsp;{" "}
            </p>
          </Col>
          <Col xs="12" sm="6">
            <div className="button-container">
              <Button tag={Link} to="" color="relief-primary">
                Soal Jurnal
              </Button>
              <Button color="flat-dark" onClick={toggle}>
                Submit File{" "}
                <Upload
                  size={12}
                  style={{ marginLeft: "5px", color: "black" }}
                />
              </Button>
            </div>
          </Col>
        </Row>
        <Collapse isOpen={isOpen}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Assistant Feedback */}
            <Label className="form-label" for="assistantFeedback">
              <b>Feedback for assistant</b>
            </Label>
            <Controller
              name="assistantFeedback"
              control={control}
              defaultValue=''
              rules={{
                required: "Please fill feedback!",
                minLength: { value: 30, message: "Minimum 30 characters" },
                pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b)(?!.*(\w)\2{3,}).*$/, message: "Don't copy paste same thing :D" }
              }}
              render={({ field }) => (
                <Input
                  type="textarea"
                  disabled={isLoading}
                  invalid={errors.assistantFeedback && true}
                  {...field}
                />
              )}
            />
            {errors && errors.assistantFeedback && (
              <FormFeedback>{errors.assistantFeedback.message}</FormFeedback>
            )}
            {/* Practicum Feedback */}
            <Label className="form-label mt-1" for="sessionfeedback">
              <b>Feedback for session</b>
            </Label>
            <Controller
              name="sessionfeedback"
              control={control}
              defaultValue=''
              rules={{
                required: "Please fill feedback!",
                minLength: { value: 30, message: "Minimum 30 characters" },
                pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b)(?!.*(\w)\2{3,}).*$/, message: "Don't copy paste same thing :D" }
              }}
              render={({ field }) => (
                <Input
                  type="textarea"
                  disabled={isLoading}
                  invalid={errors.sessionfeedback && true}
                  {...field}
                />
              )}
            />
            {errors && errors.sessionfeedback && (
              <FormFeedback>{errors.sessionfeedback.message}</FormFeedback>
            )}
            {/* Laboratory Feedback */}
            <Label className="form-label mt-1" for="laboratoryfeedback">
              <b>Feedback for laboratory</b>
            </Label>
            <Controller
              name="laboratoryfeedback"
              control={control}
              defaultValue=''
              rules={{
                required: "Please fill feedback!",
                minLength: { value: 30, message: "Minimum 30 characters" },
                pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b)(?!.*(\w)\2{3,}).*$/, message: "Don't copy paste same thing :D" }
              }}
              render={({ field }) => (
                <Input
                  type="textarea"
                  invalid={errors.laboratoryfeedback && true}
                  disabled={isLoading}
                  {...field}
                />
              )}
            />
            {errors && errors.laboratoryfeedback && (
              <FormFeedback>{errors.laboratoryfeedback.message}</FormFeedback>
            )}
            <Label className="form-label mt-1" for="file">
              <b>Journal File</b>
            </Label>
            <Controller
              name="file"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Dropzone
                  loading={isLoading}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form>
        </Collapse>
      </Container>
      {/* </CardBody> */}
    </Card>
  )
}
