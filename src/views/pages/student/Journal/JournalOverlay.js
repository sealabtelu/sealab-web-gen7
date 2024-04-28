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
// import { verify } from "@store/api/gformSurvey"
// import { getUserData } from "@utils"

// ** Third Party Imports File Uploader
import { Controller, useForm } from "react-hook-form"
import Dropzone from "@custom-components/dropzone"

export default function PreTestOverlay({ moduleTitle, moduleNumber }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading: isVerifyLoading } = useSelector((state) => state.gformSurvey)
  const { isLoading } = useSelector((state) => state.journalAnswer)
  // const { appToken } = getUserData()

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    if (!isOpen) {
      // Uncoment jika butuh survey
      // dispatch(verify()).then(({ payload: { isValid } }) => {
      //   if (isValid) {
      //     setIsOpen(!isOpen)
      //   } else {
      //     window.open(`https://docs.google.com/forms/d/e/1FAIpQLSdV-HWJ9D1QKx6UPVuy_ZGWotJxpTdpQQvGEP8EIyAP66792Q/viewform?usp=pp_url&entry.2072338726=${appToken}`)
      //     alert("Isi dulu Google Formnya! Baru boleh submit jurnal :D")
      //   }
      // })
      // Jika kode diatas di uncomment hapus ini
      setIsOpen(!isOpen)
    } else {
      setIsOpen(!isOpen)
    }
  }

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
            {/*
            <p>
              <b>Due Date: </b> &nbsp;{" "}
            </p>
            <p>
              <b>Time Remaining:</b> &nbsp; 1 Hour 23 Min
            </p>
            <p>
              <b>Time Submitted:</b> &nbsp;{" "}
            </p>
            */}
          </Col>
          <Col xs="12" sm="6">
            <div className="button-container">
              {/* <Button tag={Link} to="" color="relief-primary">
                Soal Jurnal
              </Button> */}
              <Button
                href="https://telkomuniversityofficial-my.sharepoint.com/:w:/g/personal/sealaboratory_365_telkomuniversity_ac_id/EQV1He1b5-5LqSRrDeoQHIsBvNNO29wCJcyDoHT5rCoRpw?e=8WTQct"
                target="_blank"
                color="relief-primary"
              >
                <b>Soal Jurnal</b>
              </Button>
              <Button
                href="https://telkomuniversityofficial-my.sharepoint.com/:w:/g/personal/sealaboratory_365_telkomuniversity_ac_id/ERCRF9oYgGNBhISx_H9z35kBwyFvlYIfz2vMNCotgKBbsw?e=DJp7Mz"
                target="_blank"
                color="relief-primary"
              >
                <b>Soal Tes Akhir</b>
              </Button>
              <Button color="flat-dark" onClick={toggle} disabled={isVerifyLoading} >
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
                minLength: { value: 45, message: "Minimum 45 characters" },
                // pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b.*\b\1\b.*\b\1\b)(?!.*(\w|\W)\2{3,})(?!.*(.)\3(.)\4(.)\10)(?!.*(.)\11(.)\12\11\11)(?!.*\b(\w.*)\5{2,}\b)(?!.*\b((.).*)\6{2,}\7\b)(?!.*\b\W{3,}\b)(?!.*(\W)\w\8)(?!.*\b\w+(\w)\w+\9\w+\9\w+\9\b)(?!.*\b\w{15,}\b)(?!.*Lorem)(?!.*lorem)(?!.*LOREM).*$/, message: "Yang bener isi feedbacknya ya... 😉" }
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
                minLength: { value: 45, message: "Minimum 45 characters" },
                 // pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b.*\b\1\b.*\b\1\b)(?!.*(\w|\W)\2{3,})(?!.*(.)\3(.)\4(.)\10)(?!.*(.)\11(.)\12\11\11)(?!.*\b(\w.*)\5{2,}\b)(?!.*\b((.).*)\6{2,}\7\b)(?!.*\b\W{3,}\b)(?!.*(\W)\w\8)(?!.*\b\w+(\w)\w+\9\w+\9\w+\9\b)(?!.*\b\w{15,}\b)(?!.*Lorem)(?!.*lorem)(?!.*LOREM).*$/, message: "Yang bener isi feedbacknya ya... 😉" }
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
                minLength: { value: 45, message: "Minimum 45 characters" },
                // pattern: { value: /^(?!.*\b(\w+)\b.*\b\1\b.*\b\1\b.*\b\1\b)(?!.*(\w|\W)\2{3,})(?!.*(.)\3(.)\4(.)\10)(?!.*(.)\11(.)\12\11\11)(?!.*\b(\w.*)\5{2,}\b)(?!.*\b((.).*)\6{2,}\7\b)(?!.*\b\W{3,}\b)(?!.*(\W)\w\8)(?!.*\b\w+(\w)\w+\9\w+\9\w+\9\b)(?!.*\b\w{15,}\b)(?!.*Lorem)(?!.*lorem)(?!.*LOREM).*$/, message: "Yang bener isi feedbacknya ya... 😉" }
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
