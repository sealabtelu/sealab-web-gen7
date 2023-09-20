/* eslint-disable react/prop-types */
import { Card, Button, Row, Col, Container } from "reactstrap";
import { Link } from 'react-router-dom'


export default function PreTestOverlay({ moduleTitle, moduleNumber,linkSoal,duedate}) {
    return (
        <Card className="card-overlay-jurnal">
            {/* INFO */}
            <h1>HARAP DIBACA</h1>
                <ol type="1">
                    <li>
                        Tugas Pendahuluan dikerjakan sesuai dengan NIM terakhir Praktikan.<br />
                        <b>Contoh:</b> 1103211233 [mengerjakan soal NIM Ganjil]<br />
                        <b>Contoh:</b> 1103211234 [mengerjakan soal NIM Genap]
                    </li>
                    <li>
                        Tugas Pendahuluan dikerjakan menggunakan Template Tugas Pendahuluan di word dan dikumpulkan dalam format PDF
                    </li>
                    <li>
                        Jika terdapat soal yang memerlukan jawaban untuk ditulis manual maka jawaban dapat di foto/scan dan kemudian di masukan ke dalam File Tugas Pendahuluan.
                    </li>
                    <li>
                        Jawaban Tugas Pendahuluan diketik secara berurutan. Soal kemudian Jawaban.
                    </li>
                    <li>
                        Format penamaan file Tugas Pendahuluan sebagai berikut:<br />
                        <b>TP_NAMA_NIM_MODUL_HARI_SHIFT&shy;_KELOMPOK</b><br />
                        <b>Contoh: TP_MUHAMMAD HILMY AZIZ_1103190001_MODUL 1_RABU_SHIFT 2_13</b>
                    </li>
                    <li>
                        Tugas Pendahuluan dikumpulkan melalui website i-Smile dengan batas pengumpulan <b>Hari Sabtu 23:59 WIB.</b>
                    </li>
                    <li>
                        Seluruh informasi kebutuhan untuk Praktikum Kecerdasan Buatan dapat diakses melalui Website i-Smile.
                    </li>
                </ol>

                    <hr />
            
            {/* SUBMIT */}
            <Container>
                <Row>
                    <Col>
                        <h2>Tes Awal</h2>
                        <h3>MODUL {moduleNumber}: {moduleTitle}</h3>
                        <p><b>Due Date: </b> &nbsp;{duedate} </p>
                        <p><b>Time Remaining:</b> &nbsp; 1 Hour 23 Min</p>
                        <p><b>Time Submitted:</b> &nbsp; </p>
                    </Col>
                    <Col xs='12' sm='6'>
                    <div className="button-container">
                        <Button tag={Link} to='/student/pre-test/questionList' color="relief-primary" >Soal Tes Awal</Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}
