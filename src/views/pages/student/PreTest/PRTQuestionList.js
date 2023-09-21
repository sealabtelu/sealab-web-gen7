import { useEffect, Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion } from '@store/api/preTestQuestion'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

const PRTQuestionList = () => {
  const dispatch = useDispatch()
  const module = useSelector(state => state.module)
  const preTest = useSelector(state => state.preTestQuestion)

  useEffect(() => {
    dispatch(getQuestion())
  }, [])

  const renderListQuestion = () => {
    if (preTest.questions?.length > 0) {
      return preTest.questions.map((item, index) => {
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
                <div className="divider my-2">
                  <div className="divider-text">Answer Key</div>
                </div>
                <div className='option-list-wrapper'>
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
          <h6>{`Total Question: ${preTest.questions.length}`}</h6>
        </CardBody>
      </Card>

      {renderListQuestion()}
    </Fragment>
  )
}

export default PRTQuestionList