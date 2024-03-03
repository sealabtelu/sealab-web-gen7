// ** Third Party Components
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import Select from 'react-select'
import Editor from '@monaco-editor/react'

import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Button, Input, Collapse } from 'reactstrap'
import { getRuntimes, execute } from '@store/api/codePlayground'
import { ChevronDown, ChevronUp } from "react-feather"

const CodePlayground = () => {
    const dispatch = useDispatch()

    const { snippets, output, isLoading } = useSelector((state) => state.codePlayground)

    const [language, setLanguage] = useState("")
    const [code, setCode] = useState("")
    const [runtimes, setRuntimes] = useState([])
    const [input, setInput] = useState("")
    const [isInputOpen, setisInputOpen] = useState(true)

    useEffect(() => {
        dispatch(getRuntimes())
            .unwrap()
            .then((data) => {
                const result = data.filter(({ language }) => language === "python" || language === "c").map(({ language, version }) => ({
                    name: language,
                    label: `${language} v${version}`,
                    value: version
                }))
                setRuntimes(result)
                setLanguage(result[0])
                setCode(snippets[result[0].name])
            })
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Code Playground</CardTitle>
            </CardHeader>
            <CardBody>
                <Row className='d-flex align-items-end'>
                    <Col className='mb-1' xs='6'>
                        <Label className='form-label'>Select Language</Label>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            options={runtimes}
                            value={language}
                            onChange={(value) => {
                                setLanguage(value)
                                setCode(snippets[value.name])
                            }}
                        />
                    </Col>
                    <Col className='d-flex justify-content-end mb-1' xs='6'>
                        <Button.Ripple
                            color='primary'
                            type='submit'
                            onClick={() => {
                                const { name, value } = language
                                dispatch(execute({
                                    language: name,
                                    version: value,
                                    files: [{ content: code }],
                                    stdin: input
                                }))
                            }}
                            disabled={isLoading}
                        >Run Code</Button.Ripple>
                    </Col>
                </Row>
                <Row >
                    <Col className='mb-1' md='6'>
                        <Editor
                            theme="vs-dark"
                            height="90vh"
                            options={{ readOnly: isLoading }}
                            language={language.name}
                            defaultValue={code}
                            onChange={setCode}
                            value={code}
                        />
                    </Col>
                    <Col className='mb-1' md='6'>
                        <div className="h-100 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start" style={{ cursor: 'pointer' }} onClick={() => setisInputOpen(!isInputOpen)}>
                                <h5 >Input</h5>
                                {isInputOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                            </div>
                            <Collapse isOpen={isInputOpen} >
                                <Input
                                    type='textarea'
                                    rows='3'
                                    className="mb-2"
                                    placeholder="Optional stdin here..."
                                    disabled={isLoading}
                                    value={input}
                                    onChange={({ target: { value } }) => setInput(value)}
                                />
                            </Collapse>
                            <h5 className="mt-1">Output</h5>
                            <pre className="bash flex-grow-1 m-0" >
                                {output ?? 'Click "Run Code" to see the output here'}
                            </pre>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default CodePlayground 
