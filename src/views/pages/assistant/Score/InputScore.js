// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { Fragment, useEffect } from "react"

// ** Third Party Components
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import DataTable, { createTheme } from 'react-data-table-component'
import moment from 'moment/moment'

import Breadcrumbs from '@components/breadcrumbs'
import PDFViewer from "@custom-components/pdf-viewer"

// ** Utils
import { selectThemeColors, formatUTCtoLocale } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import { useSkin } from "@hooks/useSkin"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Spinner, Label, Button, Form, FormFeedback, Input, ListGroup, ListGroupItem, Badge } from 'reactstrap'

import { useDispatch, useSelector } from 'react-redux'
import { inputScore } from '@store/api/seelabs'
import { getAllSubmissions, clearSubmissions } from '@store/api/module'

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const InputScore = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { skin } = useSkin()

  const {
    currentDSG,
    groupDetail,
    moduleOptions,
    isLoading,
    isSubmitLoading
  } = useSelector(state => state.seelabs)
  const {
    submissions,
    isLoading: submissionsLoading
  } = useSelector(state => state.module)

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm()

  useEffect(() => {
    dispatch(clearSubmissions())
  }, [])

  const onSubmit = ({ date, module, scores }) => {
    dispatch(inputScore({
      date: formatUTCtoLocale(date),
      module: module.value,
      scores: scores.map(item => ({
        ...item,
        status: item.d !== 0
      }))
    })).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate('/assistant/select-group')
      }
    })
  }

  const CustomInput = ({ name }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={0}
      render={({ field }) => (
        <Input
          type="number"
          min="0" max="100"
          className="input-group-field-number text-center"
          placeholder="..."
          disabled={isLoading || isSubmitLoading}
          {...field} />
      )}
    />
  )

  const submissionColumns = [
    {
      name: "NIM",
      grow: 1,
      minWidth: "9rem",
      selector: (row) => row.nim
    },
    {
      name: "Name",
      grow: 2,
      wrap: true,
      selector: (row) => row.name
    },
    {
      name: "TA",
      grow: 1,
      center: true,
      selector: (row) => row.prtScore
    },
    {
      name: "TP Submit Time",
      grow: 2,
      wrap: true,
      selector: (row) => row.paSubmitTime,
      format: (row) => moment(row.paSubmitTime).utc().format("ddd DD MMM YYYY HH:mm A")
    },
    {
      name: "TP",
      minWidth: "150px",
      button: true,
      selector: (row) => (
        row.paFilePath ? <NavLink to={row.paFilePath} target="_blank">
          <Button.Ripple
            color='primary'
            disabled={isLoading}
          >
            Link
          </Button.Ripple>
        </NavLink> : 'none'
      )

    },
    {
      name: "Journal",
      minWidth: "150px",
      button: true,
      selector: (row) => (
        row.jFilePath ? <NavLink to={row.jFilePath} target="_blank">
          <Button.Ripple
            color='primary'
            disabled={isLoading}
          >
            Link
          </Button.Ripple>
        </NavLink> : 'none'
      )
    }
  ]

  const inputColumns = [
    {
      name: "Name",
      grow: 4,
      wrap: true,
      selector: (row, index) => (
        <Fragment>
          {row.name}
          <Controller
            name={`scores[${index}].uid`}
            control={control}
            defaultValue={row.uid}
            render={({ field }) => (
              <Input type='hidden' {...field} />
            )}
          />
        </Fragment>
      )
    },
    {
      name: "TA",
      center: true,
      selector: (row, index) => (
        <CustomInput
          name={`scores[${index}].ta`}
        />
      )
    },
    {
      name: "TP",
      center: true,
      selector: (row, index) => (
        <CustomInput
          name={`scores[${index}].tp`}
        />
      )
    },
    {
      name: "D",
      center: true,
      selector: (row, index) => (
        <CustomInput
          name={`scores[${index}].d`}
        />
      )

    },
    {
      name: "I1",
      center: true,
      selector: (row, index) => (
        <CustomInput
          name={`scores[${index}].i1`}
        />
      )
    },
    {
      name: "I2",
      center: true,
      selector: (row, index) => (
        <CustomInput
          name={`scores[${index}].i2`}
        />
      )
    }
  ]

  return (
    <Fragment>
      {/* GROUP INFO LINK */}
      <Breadcrumbs title='Input Score' data={[{ title: 'Group List', link: '/assistant/select-group' }, { title: 'Input' }]} />
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Input Score</CardTitle>
        </CardHeader>

        <CardBody>
          {/* INPUT SIDE */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row >
              {/* PILIH MODUL FIELD */}
              <Col className='mb-1' md='4' sm='12'>
                <Label className='form-label'>Select Module</Label>
                <Controller
                  name='module'
                  control={control}
                  // defaultValue={moduleOptions[0]}
                  rules={{ required: "Select module!" }}
                  render={({ field }) => (
                    <Select
                      theme={selectThemeColors}
                      className={`react-select ${errors.module && "is-invalid"}`}
                      classNamePrefix='select'
                      options={moduleOptions}
                      isClearable
                      isDisabled={isLoading || isSubmitLoading}
                      {...field}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          dispatch(getAllSubmissions({
                            seelabsId: selectedOption.value,
                            group: currentDSG.group
                          })).then(({ payload }) => {
                            groupDetail.map((item, index) => setValue(`scores[${index}].ta`, payload.find(x => x.name === item.name).prtScore))
                          })
                        } else {
                          dispatch(clearSubmissions())
                        }
                        field.onChange(selectedOption)
                      }}
                    />
                  )}
                />
                {errors && errors.module && (
                  <FormFeedback>{errors.module.message}</FormFeedback>
                )}
              </Col>
              {/* DATE PICKER FIELD */}
              <Col className='mb-1' md='4' sm='12'>
                <Label className='form-label' for='default-picker'>
                  Date
                </Label>
                <Controller
                  name='date'
                  control={control}
                  defaultValue={[new Date()]}
                  render={({ field }) => (
                    <Flatpickr
                      className='form-control'
                      disabled={isLoading || isSubmitLoading}
                      // options={{ enableTime: false }}
                      {...field} />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <DataTable
                responsive
                striped
                expandableRows
                highlightOnHover
                noHeader
                progressPending={isLoading || submissionsLoading}
                data={submissions}
                columns={submissionColumns}
                noDataComponent='Select Module'
                theme={skin}
                className='react-dataTable my-1'
                sortIcon={<ChevronDown size={10} />}
                expandableRowsComponent={({ data }) => {
                  return (
                    <div className='expandable-content p-2'>
                      {
                        !data.feedback && data.prtDetail.length === 0 &&
                        <div>No data available</div>
                      }
                      {
                        data.feedback && <ListGroup className='list-group-horizontal-sm justify-content-center mb-2'>
                          <ListGroupItem><p className="fw-bold">Assistant</p>{data.feedback.assistant}</ListGroupItem>
                          <ListGroupItem><p className="fw-bold">Session</p>{data.feedback.session}</ListGroupItem>
                          <ListGroupItem><p className="fw-bold">Laboratory</p>{data.feedback.laboratory}</ListGroupItem>
                        </ListGroup>
                      }
                      <ListGroup>
                        {
                          data.prtDetail?.map((item, index) => {
                            return <ListGroupItem key={index} >
                              <div className="d-flex">
                                <div>
                                  <Badge color='primary' pill className='me-1'>
                                    {index + 1}
                                  </Badge>
                                </div>
                                <span dangerouslySetInnerHTML={{ __html: item.question }}></span>
                              </div>
                              <div className='d-flex justify-content-between w-100'>
                                <h5><strong>Jawab: </strong> {item.answer}</h5>
                                <div>
                                  <Badge color={item.verdict === "Correct" ? "success" : "danger"} pill>
                                    {item.verdict}
                                  </Badge>
                                </div>
                              </div>
                            </ListGroupItem>
                          })
                        }
                      </ListGroup>
                    </div>
                  )
                }}
                progressComponent={
                  <div className='d-flex justify-content-center my-1'>
                    <Spinner color='primary' />
                  </div>
                }
              />
            </Row>
            {!isLoading && (
              <Row>
                <DataTable
                  responsive
                  striped
                  highlightOnHover
                  noHeader
                  progressPending={isLoading}
                  data={groupDetail}
                  columns={inputColumns}
                  theme={skin}
                  className='react-dataTable my-1'
                  sortIcon={<ChevronDown size={10} />}
                  progressComponent={
                    <div className='d-flex justify-content-center my-1'>
                      <Spinner color='primary' />
                    </div>
                  }
                />
              </Row>
            )}

            {/* SUBMIT */}
            <Button.Ripple color='primary' type='submit' block disabled={isLoading || isSubmitLoading}>
              {isSubmitLoading && <Spinner color='light' size='sm' />}
              <span className='align-middle'> Submit</span>
            </Button.Ripple>
          </Form>
          {/* </Col>
          </Row> */}

        </CardBody>
      </Card>

      {/* PDF SIDE */}
      <PDFViewer data={submissions} />

    </Fragment>
  )
}
export default InputScore
