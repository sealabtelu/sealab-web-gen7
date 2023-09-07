import axios from 'axios'

import { useEffect, useState, Fragment } from 'react'

import { Link, useParams } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/editor/editor.scss'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

const PreliminaryAssignment = () => {
  const { id } = useParams()
  // ** State
  const [questions, setQuestions] = useState([])
  const [module, setModule] = useState('')

  useEffect(() => {
    axios.get(`/preliminary-assignment-question/module/${id}`).then(res => {
      // Gatau knp tp harus gini anjir aneh battt
      const data = { ...res.data }
      setQuestions(data.data)
      setModule(data.data[0].moduleInfo)
    })
  }, [])

  const renderListQuestion = () => {
    if (questions.length > 0) {
      return questions.map((item, index) => {
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
                {item.question}
                <div className="divider my-2">
                  <div className="divider-text">Answer Key</div>
                </div>
                {item.answerKey}
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
          <CardTitle tag='h4'>{module}</CardTitle>
        </CardHeader>
        <CardBody className='question-header'>
          <h6>{`Total Question: ${questions.length}`}</h6>
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

export default PreliminaryAssignment