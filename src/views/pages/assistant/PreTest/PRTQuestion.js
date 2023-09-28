import { Link, useNavigate } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/editor/editor.scss'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Edit, HelpCircle, PlusSquare } from 'react-feather'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { addQuestion } from '@store/api/preTestQuestion'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Form, Row, Col, Input } from 'reactstrap'

const defaultValues = {
  isTrue: null,
  question: EditorState.createEmpty(),
  options: ['', '', '', '']
}

const PRTQuestion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    dispatch(addQuestion({
      question: draftToHtml(data.question),
      options: data.options.map((item, index) => ({
        option: item,
        isTrue: parseInt(data.isTrue) === index
      }))
    })).then(() => {
      navigate('/assistant/pre-test/question-list')
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card className='question-item'>
        <CardHeader className='question-title'>
          <div className='d-flex'>
            <Avatar className='rounded' color='light-info' icon={<HelpCircle size={20} />} />
            <div className='title'>
              <h4>Module 1</h4>
            </div>
          </div>
          <div>
            <Button color='relief-success' type='submit'>
              <Edit size={14} />
              <span className='align-middle'> Add</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-1">
            <Label className="form-label" for="field-question">
              <h5>Question</h5>
            </Label>
            <Controller
              name='question'
              control={control}
              render={({ field }) => (
                <Editor
                  id='field-question'
                  placeholder='Enter the question here...'
                  {...field} />
              )}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="field-answer">
              <h5>Answer Key</h5>
            </Label>
            <Row>
              {defaultValues.options.map((item, index) => (
                <Col md='6' sx='12' className='mb-2' key={index}>
                  <div className='form-check'>
                    <Controller
                      name='isTrue'
                      control={control}
                      rules={{ required: 'Choose the goddamn right choice dude!' }}
                      render={({ field }) => (
                        <Input type='radio' {...field} value={index} />
                      )}
                    />
                    <Controller
                      name={`options[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <Input type='textarea' rows='2' placeholder={`Option ${index + 1}`} {...field} />
                      )}
                    />
                  </div>
                </Col>
              ))}
              {errors.isTrue && <p>{errors.isTrue.message}</p>}
            </Row>
          </div>
        </CardBody>
      </Card>
    </Form>
  )
}

export default PRTQuestion
