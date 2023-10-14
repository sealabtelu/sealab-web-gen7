import { useEffect, Fragment } from "react"
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { getListQuestion } from "@store/api/preTestQuestion"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Icons Imports
import { HelpCircle, Upload } from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from "reactstrap"

import "@src/assets/scss/question-list.scss"

const PRTQuestionList = () => {
  const dispatch = useDispatch()
  const module = useSelector((state) => state.module)
  const preTest = useSelector((state) => state.preTestQuestion)

  useEffect(() => {
    dispatch(getListQuestion())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const renderListQuestion = () => {
    if (preTest.questions?.length > 0) {
      return preTest.questions.map((item, index) => {
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
                  {item.options.map((answerKey, index) => (
                    <label key={index} className="option-list">
                      <input
                        type="radio"
                        name={`answer${item.id}`} // Use a unique name for each group of radio buttons
                        value={answerKey.option} // Set the value to "A", "B", etc.
                      />
                      {String.fromCharCode(65 + index)}. {answerKey.option}
                    </label>
                  ))}
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
              {`Total Question: ${preTest.questions.length}`}
            </CardBody>
          </Col>
        </Row>
      </Card>
      {renderListQuestion()}
      <Button color="flat-dark" className="submit-button">
        Submit File{" "}
        <Upload size={12} style={{ marginLeft: "5px", color: "black" }} />
      </Button>
    </Fragment>
  )
}

export default PRTQuestionList
