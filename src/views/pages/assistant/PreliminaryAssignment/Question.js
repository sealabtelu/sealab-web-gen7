import axios from 'axios'

import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/editor/editor.scss'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'
import { Edit, Delete, HelpCircle, PlusSquare } from 'react-feather'

// ** Third Party Components
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

const PreliminaryAssignment = () => {

  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Card className='question-item'>
      <CardHeader className='question-title'>
        <div className='d-flex'>
          <Avatar className='rounded' color='light-info' icon={<HelpCircle size={20} />} />
          <div className='title'>
            <h4>Module 1</h4>
          </div>
        </div>
        <div>
          <Button color='relief-success' tag={Link} to='/assistant/preliminary-assignment/question'>
            <Edit size={14} />
            <span className='align-middle'>Add</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <h5 className='my-1'>
          Question
        </h5>
        <Editor editorState={value} onEditorStateChange={data => setValue(data)} />
        <h5 className='my-1'>
          Answer
        </h5>
        <Editor editorState={value} onEditorStateChange={data => setValue(data)} />
      </CardBody>
    </Card>
  )
}

export default PreliminaryAssignment
