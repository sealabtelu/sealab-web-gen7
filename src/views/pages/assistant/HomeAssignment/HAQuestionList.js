import { useEffect, Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getListQuestion, deleteQuestion, selectQuestion } from '@store/api/homeAssignmentQuestion'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import '@src/assets/scss/question-list.scss'

const MySwal = withReactContent(Swal)

const HAQuestionList = () => {
  const dispatch = useDispatch()
  const module = useSelector(state => state.module)
  const homeAssignment = useSelector(state => state.homeAssignmentQuestion)

  useEffect(() => {
    dispatch(getListQuestion())
  }, [])

  const handleDelete = async id => {
    return await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        dispatch(deleteQuestion({ id })).then(({ payload }) => {
          if (payload.status === 200) {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
            dispatch(getListQuestion())
          } else {
            MySwal.fire({
              title: 'Failed',
              text: 'Something wrong...',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
          }
        })
      }
    })
  }

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
              <div>
                <Button color='relief-primary' tag={Link} to='/assistant/preliminary-assignment/question/edit' onClick={() => { dispatch(selectQuestion(item)) }}>
                  <Edit size={14} />
                  <span className='align-middle ms-25'>Edit</span>
                </Button>
                <Button className='btn-icon ms-1' color='relief-danger' onClick={() => { handleDelete(item.id) }}>
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
          <h6>{`Total Question: ${homeAssignment.questions.length}`}</h6>
          <Button color='relief-success' tag={Link} to='/assistant/preliminary-assignment/question/add'>
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