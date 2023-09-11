import { useEffect, Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion } from '@store/api/homeAssignmentQuestion'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

const HAQuestionList = () => {
  const dispatch = useDispatch()
  const module = useSelector(state => state.module)
  const question = useSelector(state => state.homeAssignmentQuestion)

  useEffect(() => {
    dispatch(getQuestion())
  }, [])

  const renderListQuestion = () => {
    if (question.PAQuestions?.length > 0) {
      return question.PAQuestions.map((item, index) => {
        return (
          <Card className='question-item' key={item.id}>
            <CardHeader className='question-title'>
              <div className='d-flex'>
                <Avatar className='rounded' color='light-info' icon={<HelpCircle size={20} />} />
                <div className='title'>
                  <h4>{`Question ${index + 1}`}</h4>
                </div>
              </div>
              <div>
                <Button color='relief-primary' tag={Link} to='/assistant/preliminary-assignment/question'>
                  <Edit size={14} />
                  <span className='align-middle ms-25'>Edit</span>
                </Button>
                <Button className='btn-icon ms-1' color='relief-danger'>
                  <Delete size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.question }}></div>
                <div className="divider my-2">
                  <div className="divider-text">Answer Key</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: item.answerKey }}></div>
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
        <CardHeader>
          <CardTitle tag='h4'>{`Module ${module.selectedModule.seelabsId}: ${module.selectedModule.name}`}</CardTitle>
        </CardHeader>
        <CardBody className='question-header'>
          <h6>{`Total Question: ${question.PAQuestions.length}`}</h6>
          <Button color='relief-success' tag={Link} to='/assistant/preliminary-assignment/question'>
            <PlusSquare size={14} />
            <span className='align-middle ms-25'>Add</span>
          </Button>
        </CardBody>
      </Card>

      {renderListQuestion()}
    </Fragment>
  )
}

export default HAQuestionList