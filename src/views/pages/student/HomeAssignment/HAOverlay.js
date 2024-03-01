import { useState, useEffect } from "react" // Import React
import { Card, Button, Row, Col, Container } from "reactstrap"
import { Link } from "react-router-dom"
import { selectModule } from "@store/api/module"
import { useDispatch } from "react-redux"
import moment from "moment/moment"

const OverlayHA = ({ moduleTitle, moduleNumber, item }) => {
  const dispatch = useDispatch()
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [deadline, setDeadline] = useState("")
  useEffect(() => {
    const now = new Date()
    const midnight = new Date("2023-10-29T12:00:00")
    setDeadline(midnight)
    // midnight.setHours(12, 0, 0, 0);

    const timeDiff = midnight - now
    if (timeDiff > 0) {
      setTimeRemaining(Math.floor(timeDiff / 1000))
    } else {
      setTimeRemaining(0)
    }

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => {
      clearInterval(interval)
    }
  }, [timeRemaining])

  const formatTime = (seconds) => {
    const hour = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hour}:${minutes}:${remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`
  }

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
            {/* <p>
              <b>Due Date: </b>{" "}
              {moment(deadline).format("ddd DD MMM YYYY HH:mm A")}
            </p>
            <p>
              <b>Time Remaining: </b>
              {formatTime(timeRemaining)}
            </p> */}
            {/* <p>
              <b>Time Submitted:</b> &nbsp;{" "}
            </p> */}
          </Col>
          <Col xs="12" sm="6">
            <div className="button-container">
              <Button
                tag={Link}
                to="/student/home-assignment/questionList"
                color="relief-primary"
                onClick={() => dispatch(selectModule(item))}
              >
                Soal Tugas Pendahuluan
              </Button>
              <Button
                href="https://telkomuniversityofficial-my.sharepoint.com/:w:/g/personal/yogasherlambang_student_telkomuniversity_ac_id/EbhL8XLdtQNFsF2myz1wM-UBwpKOxhaeIsYMsULGEf-pgQ?e=Eilyd6"
                target="_blank"
                color="flat-dark"
              >
                <b>Template Jawaban TP</b>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

export default OverlayHA
