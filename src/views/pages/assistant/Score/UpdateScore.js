// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { Fragment, useEffect } from "react"

// ** Third Party Components
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'
import Breadcrumbs from '@components/breadcrumbs'
import moment from 'moment/moment'

import PDFViewer from "@custom-components/pdf-viewer"

// ** Utils
import { isObjEmpty } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import { useSkin } from "@hooks/useSkin"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Spinner, Button, Form, Input, ListGroup, ListGroupItem, Badge } from 'reactstrap'

import { useDispatch, useSelector } from 'react-redux'
import { updateScore, clearInputDetail } from '@store/api/seelabs'
import { clearSubmissions } from '@store/api/module'

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const UpdateScore = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { skin } = useSkin()

  const {
    inputScoreDetail,
    isLoading,
    isSubmitLoading
  } = useSelector(state => state.seelabs)
  const {
    submissions,
    isLoading: submissionsLoading
  } = useSelector(state => state.module)

  const {
    control,
    // formState: { errors },
    handleSubmit
  } = useForm()

  useEffect(() => {
    dispatch(clearSubmissions())
    dispatch(clearInputDetail())
  }, [])

  const onSubmit = ({ scores }) => {
    dispatch(updateScore({
      ...inputScoreDetail,
      scores: scores.map(item => ({
        ...item,
        status: item.d !== 0
      }))
    })).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate('/assistant/input-result')
      }
    })
  }

  const CustomInput = ({ name, value }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
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
      minWidth: "9rem",
      selector: (row) => row.nim
    },
    {
      name: "Name",
      wrap: true,
      minWidth: '12rem',
      selector: (row) => row.name
    },
    {
      name: "TA",
      grow: 0,
      center: true,
      selector: (row) => row.prtScore
    },
    {
      name: "TP Submit Time",
      wrap: true,
      minWidth: '11rem',
      selector: (row) => row.paSubmitTime,
      format: (row) => moment(row.paSubmitTime).utc().format("ddd DD MMM YYYY h:mm A")
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
      selector: ({ name, uid }, index) => (
        <Fragment>
          {name}
          <Controller
            name={`scores[${index}].uid`}
            control={control}
            defaultValue={uid}
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
      selector: ({ ta }, index) => (
        <CustomInput
          name={`scores[${index}].ta`}
          value={ta}
        />
      )
    },
    {
      name: "TP",
      center: true,
      selector: ({ tp }, index) => (
        <CustomInput
          name={`scores[${index}].tp`}
          value={tp}
        />
      )
    },
    {
      name: "D",
      center: true,
      selector: ({ d }, index) => (
        <CustomInput
          name={`scores[${index}].d`}
          value={d}
        />
      )

    },
    {
      name: "I1",
      center: true,
      selector: ({ i1 }, index) => (
        <CustomInput
          name={`scores[${index}].i1`}
          value={i1}
        />
      )
    },
    {
      name: "I2",
      center: true,
      selector: ({ i2 }, index) => (
        <CustomInput
          name={`scores[${index}].i2`}
          value={i2}
        />
      )
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Input Result' data={[{ title: 'Group List', link: '/assistant/input-result' }, { title: 'Update' }]} />
      {/* GROUP INFO LINK */}
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Update Score</CardTitle>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <DataTable
              responsive
              striped
              highlightOnHover
              noHeader
              progressPending={isLoading}
              data={inputScoreDetail?.scores}
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
            {
              !isObjEmpty(inputScoreDetail) &&
              <Button.Ripple color='primary' type='submit' block disabled={isLoading || isSubmitLoading}>
                {isSubmitLoading && <Spinner color='light' size='sm' />}
                <span className='align-middle'> Submit</span>
              </Button.Ripple>
            }
          </Form>
          {/* </Col>
          </Row> */}

        </CardBody>
      </Card>


      {/* PDF SIDE */}
      {submissions.length > 0 &&
        <Fragment>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Submission List</CardTitle>
            </CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>

          <PDFViewer data={submissions} />

        </Fragment>
      }
    </Fragment>
  )
}
export default UpdateScore
