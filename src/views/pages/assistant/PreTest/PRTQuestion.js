import { useNavigate, useParams } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@src/assets/scss/question-list.scss'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Icons Imports
import { Edit, HelpCircle, PlusSquare } from 'react-feather'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion, editQuestion, clearSelected } from '@store/api/preTestQuestion'

// ** Utils
import { capitalize, isObjEmpty } from "@utils"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Form, Row, Col, Input, Spinner, InputGroup, InputGroupText } from 'reactstrap'
import { Fragment, useEffect } from 'react'

const defaultValues = {
  isTrue: undefined,
  question: EditorState.createEmpty(),
  options: Array(4).fill({ option: '' })
}

const PRTQuestion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { action } = useParams()
  const {
    isLoading,
    selectedQuestion
  } = useSelector(state => state.preTestQuestion)

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    if (action === 'edit' && !isObjEmpty(selectedQuestion)) {
      const { question, options } = selectedQuestion
      reset({
        isTrue: options.findIndex(item => item.isTrue).toString(),
        question: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(question))),
        options
      })
    } else if (action === 'add') {
      dispatch(clearSelected())
    } else {
      navigate('/error')
    }
  }, [])

  const onSubmit = ({ question, options, isTrue }) => {
    const isEdit = action === 'edit' && !isObjEmpty(selectedQuestion)
    const data = {
      question: draftToHtml(convertToRaw(question.getCurrentContent())),
      options: options.map((item, index) => ({
        ...item,
        isTrue: isTrue === index.toString()
      }))
    }
    dispatch(isEdit ? editQuestion(data) : addQuestion(data)).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate('/assistant/pre-test/master-control/question-list')
      }
    })
  }

  return (
    <Fragment>
      <Breadcrumbs title='Pre Test' data={[{ title: 'Master Control', link: '/assistant/pre-test/master-control' }, { title: 'Questions', link: '/assistant/pre-test/master-control/question-list' }, { title: 'Action' }]} />
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
              <Button color='relief-success' type='submit' disabled={isLoading} >
                {isLoading ? <Spinner color='primary' type='grow' size='sm' /> : action === 'edit' ? <Edit size={14} /> : <PlusSquare size={14} />}
                <span className='align-middle'> {capitalize(action)}</span>
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
                    editorState={field.value}
                    onEditorStateChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="field-answer">
                <h5>Answer Key</h5>
              </Label>
              <Row>
                {getValues().options.map((item, index) => (
                  <Col md='6' sx='12' className='mb-2' key={index}>
                    <InputGroup>
                      <InputGroupText>
                        <div className='form-check'>
                          <Controller
                            name='isTrue'
                            control={control}
                            rules={{ required: 'Choose the goddamn right choice dude!' }}
                            render={({ field }) => (
                              <Input type='radio' {...field} value={index} checked={field.value === index.toString()} />
                            )}
                          />
                          {item.id && (
                            <Controller
                              name={`options[${index}].id`}
                              control={control}
                              render={({ field }) => (
                                <Input type='hidden' {...field} />
                              )}
                            />
                          )}
                        </div>
                      </InputGroupText>
                      <Controller
                        name={`options[${index}].option`}
                        control={control}
                        render={({ field }) => (
                          <Input type='textarea' rows='2' placeholder={`Option ${index + 1}`} {...field} />
                        )}
                      />
                    </InputGroup>
                  </Col>
                ))}
                {errors.isTrue && <p>{errors.isTrue.message}</p>}
              </Row>
            </div>
          </CardBody>
        </Card>
      </Form>
    </Fragment>
  )
}

export default PRTQuestion
