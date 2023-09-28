import { useEffect, Fragment } from 'react'
import { Upload } from "react-feather";

import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getListQuestion } from '@store/api/homeAssignmentQuestion'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Row, Col } from 'reactstrap'

const HAQuestionList = () => {
  const dispatch = useDispatch()
  const module = useSelector(state => state.module)
  const homeAssignment = useSelector(state => state.homeAssignmentQuestion)

  useEffect(() => {
    dispatch(getListQuestion())
  }, [])

  const renderListQuestion = () => {
    if (homeAssignment.questions?.length > 0) {
      return homeAssignment.questions.map((item, index) => {
        return (
          <Card className='question-item' key={item.id}>
            <CardHeader className='question-title'>
              <div className='d-flex'>
                <Avatar className='rounded' color='light-info' icon={<HelpCircle size={20} />} />
                <div className='title'>
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
      return (
        <div>Tidak ada data yang tersedia.</div>
      )
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
            <CardBody className='question-header'>
              {`Total Question: ${homeAssignment.questions.length}`}
            </CardBody>
          </Col>
        </Row>
      </Card>
      {renderListQuestion()}
      <Button color="relief-primary" className='submit-button'>
        Submit File
      </Button>  
    </Fragment>
  )
}

export default HAQuestionList