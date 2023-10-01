import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@src/assets/scss/question-list.scss'

// ** Custom Components
import Avatar from '@components/avatar'

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
import { addQuestion, editQuestion, clearSelected } from '@store/api/homeAssignmentQuestion'

// ** Utils
import { capitalize, isObjEmpty } from "@utils"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Form, Spinner } from 'reactstrap'
const defaultValues = {
  question: EditorState.createEmpty(),
  answerKey: EditorState.createEmpty()
}

const HAQuestion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { action } = useParams()
  const {
    loading,
    selectedQuestion
  } = useSelector(state => state.homeAssignmentQuestion)

  const {
    control,
    reset,
    handleSubmit
  } = useForm({ defaultValues })

  useEffect(() => {
    if (action === 'edit' && !isObjEmpty(selectedQuestion)) {
      const { question, answerKey } = selectedQuestion
      reset({
        question: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(question))),
        answerKey: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(answerKey)))
      })
    } else if (action === 'add') {
      dispatch(clearSelected())
    } else {
      navigate('/error')
    }
  }, [])

  const onSubmit = ({ question, answerKey }) => {
    const isEdit = action === 'edit' && !isObjEmpty(selectedQuestion)
    const data = {
      question: draftToHtml(convertToRaw(question.getCurrentContent())),
      answerKey: draftToHtml(convertToRaw(answerKey.getCurrentContent()))
    }
    dispatch(isEdit ? editQuestion(data) : addQuestion(data)).then(({ payload: { status } }) => {
      if (status === 200) {
        navigate('/assistant/preliminary-assignment/question-list')
      }
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
            <Button color='relief-success' type='submit' disabled={loading} >
            {loading ? <Spinner color='primary' type='grow' size='sm' /> : action === 'edit' ? <Edit size={14} /> : <PlusSquare size={14} />}
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
            <Controller
              name='answerKey'
              control={control}
              render={({ field }) => (
                <Editor
                  id='field-answer'
                  placeholder='Enter the answer key here...'
                  editorState={field.value}
                  onEditorStateChange={field.onChange}
                />
              )}
            />
          </div>
        </CardBody>
      </Card>
    </Form>
  )
}

export default HAQuestion
