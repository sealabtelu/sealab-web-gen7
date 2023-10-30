import { useEffect, Fragment } from "react"
// ** Store & Actions
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getListQuestionStudent, clearQuestions } from "@store/api/preTestQuestion"
import { addAnswer } from "@store/api/preTestAnswer"

// ** Custom Components
import Avatar from "@components/avatar"
import toast from "react-hot-toast"

// ** Icons Imports
import { AlertCircle, HelpCircle } from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col,
  Input,
  Label,
  Form,
  Alert,
  Spinner
} from "reactstrap"

import "@src/assets/scss/question-list.scss"

const PRTQuestionList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const module = useSelector((state) => state.module)
  const { questions, isLoading } = useSelector((state) => state.preTestQuestion)
  const { isLoading: submissionsLoading } = useSelector((state) => state.preTestAnswer)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    shouldFocusError: true
  })

  useEffect(() => {
    dispatch(getListQuestionStudent()).unwrap()
      .catch(({ status }) => {
        if (status === 400) {
          dispatch(clearQuestions())
          toast.error("You already did it dude...")
          navigate("/student/pre-test")
        } else if (status === 403) {
          toast.error("You are not in session!")
          dispatch(clearQuestions())
          navigate("/student/pre-test")
        }
      })
  }, [])

  const onSubmit = ({ idAnswers }) => {
    dispatch(addAnswer({ idAnswers })).then(({ payload: { status } }) => {
      if (status === 200) {
        dispatch(clearQuestions())
        toast.success("Congrats you did it 🎉")
        navigate("/student/pre-test")
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
                {/* <div className="divider my-2">
                  <div className="divider-text">Answer Key</div>
                </div> */}
                <div className="option-list-wrapper">
                  {item.options.map((answerKey, i) => (
                    <Label className='form-check-label option-list' key={i} for={answerKey.id}>
                      <div className='form-check'>
                        <Controller
                          name={`idAnswers[${index}]`}
                          control={control}
                          defaultValue={''}
                          render={({ field }) => (
                            <Input
                              type='radio'
                              id={answerKey.id}
                              disabled={submissionsLoading}
                              {...field}
                              invalid={errors.idAnswers?.[index] && true}
                              value={answerKey.id}
                            />
                          )}
                          rules={{ required: 'Choose the goddamn right choice dude!' }}
                        />
                        {answerKey.option}
                      </div>
                    </Label>
                  ))}
                  {errors.idAnswers?.[index] && <Alert color='danger'>
                    <div className='alert-body'>
                      <AlertCircle size={15} />
                      <span className='ms-1'>
                        {errors.idAnswers[index].message}
                      </span>
                    </div>
                  </Alert>
                  }
                </div>
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
        </div> : <Form onSubmit={handleSubmit(onSubmit)}>
          {renderListQuestion()}
          <Button type="submit" color="primary" disabled={submissionsLoading}>
            Submit
          </Button>
        </Form>
      }

    </Fragment>
  )
}

export default PRTQuestionList
