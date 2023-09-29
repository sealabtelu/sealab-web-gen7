/* eslint-disable react/prop-types */
import { Card, Button, Row, Col, Container } from "reactstrap";
import { Link } from 'react-router-dom'

export default function PreTestOverlay({ moduleTitle, moduleNumber,linkSoal,duedate}) {
    return (
        <Card className="card-overlay-jurnal">
            {/* SUBMIT */}
            <Container>
                <Row>
                    <Col>
                        {/* <h2>Tugas Pendahuluan</h2> */}
                        <h3 className="title-overlay"><b>MODUL {moduleNumber}: {moduleTitle}</b></h3>
                        <p><b>Due Date: </b> &nbsp;{duedate} </p>
                        <p><b>Time Remaining:</b> &nbsp; 1 Hour 23 Min</p>
                        <p><b>Time Submitted:</b> &nbsp; </p>
                    </Col>
                    <Col xs='12' sm='6'>
                    <div className="button-container">
                        <Button tag={Link} to='/student/home-assignment/questionList' color="relief-primary" >Soal Tugas Pendahuluan</Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}
