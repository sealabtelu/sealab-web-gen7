import React from "react"
import { Card, Button, Row, Col, Container } from "reactstrap"
import { Link } from "react-router-dom"
import { selectModule } from "@store/api/module"
import { useDispatch } from "react-redux"

export default function PreTestOverlay({ moduleTitle, moduleNumber, item }) {
  const dispatch = useDispatch()
  return (
    <Card className="card-overlay-jurnal">
      {/* SUBMIT */}
      <Container>
        <Row>
          <Col>
            {/* <h2>Tugas Pendahuluan</h2> */}
            <h3 className="title-overlay">
              <b>
                MODUL {moduleNumber}: {moduleTitle}
              </b>
            </h3>
            <p>
              <b>Due Date: </b> &nbsp;{" "}
            </p>
            <p>
              <b>Time Remaining:</b> &nbsp; 1 Hour 23 Min
            </p>
            <p>
              <b>Time Submitted:</b> &nbsp;{" "}
            </p>
          </Col>
          <Col xs="12" sm="6">
            <div className="button-container">
              <Button
                tag={Link}
                to="/student/pre-test/questionList"
                color="relief-primary"
                onClick={() => dispatch(selectModule(item))}
              >
                Soal Tes Awal
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}
