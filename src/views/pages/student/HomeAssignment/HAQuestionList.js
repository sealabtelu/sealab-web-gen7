import { useEffect, Fragment } from "react"

// ** Store & Actions
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addAnswer } from "@store/api/homeAssignmentAnswer"
import { getListQuestionStudent } from "@store/api/homeAssignmentQuestion"

// ** Custom Components
import Avatar from "@components/avatar"
import Dropzone from "@custom-components/dropzone"

// ** Icons Imports
import { HelpCircle } from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  Spinner
} from "reactstrap"

// ** Styles
import "@src/assets/scss/question-list.scss"

const HAQuestionList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()

  const module = useSelector((state) => state.module)
  const { questions, isLoading } = useSelector((state) => state.homeAssignmentQuestion)
  const { isLoading: submissionsLoading } = useSelector((state) => state.homeAssignmentAnswer)

  useEffect(() => {
    dispatch(getListQuestionStudent())
  }, [])

  const onSubmit = ({ file }) => {
    dispatch(addAnswer({ file: file[0] })).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate("/student/home-assignment")
      }
    })
  }

  const renderListQuestion = () => {
    if (questions?.length > 0) {
      return questions.map((item, index) => {
        return (
          <Card className="question-item" key={item.id}>
            <CardHeader className="question-title">
              <div className="d-flex">
                <Avatar
                  className="rounded"
                  color="light-info"
                  icon={<HelpCircle size={20} />}
                />
                <div className="title">
                  <h4>{`Question ${index + 1}`}</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.question }}></div>
              </div>
            </CardBody>
          </Card>
        )
      })
    } else {
      return <div>Tidak ada data yang tersedia.</div>
    }
  }

  return (
    <Fragment>
      <Card>
        <Row>
          <Col>
            <CardHeader>
              <CardTitle className="question-header">
                {`Module ${module.selectedModule.seelabsId}: ${module.selectedModule.name}`}
              </CardTitle>
            </CardHeader>
          </Col>
          <Col>
            <CardBody className="question-header">
              {`Total Question: ${questions.length}`}
            </CardBody>
          </Col>
        </Row>
      </Card>
      {
        isLoading ? <div className='d-flex justify-content-center my-3'>
          <Spinner color='primary' />
        </div> : <Fragment>
          {renderListQuestion()}
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="file"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => (
                    <Dropzone
                      loading={submissionsLoading}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Form>
            </CardBody>
          </Card>
        </Fragment>
      }
    </Fragment>
  )
}

export default HAQuestionList
