/* eslint-disable react/prop-types */
import { Card, Button, Row, Col, Container } from "reactstrap";
import { Upload } from "react-feather";

export default function OverlayJurnal({ moduleTitle, moduleNumber,linkSubmit,linkSoal}) {
    return (
        <Card style={{padding:'10px'}}>
            {/* INFO */}
            <h1 style={{color:"#D5546D", fontSize:"18px", fontWeight:'bold', margin:'10px', textAlign:'center'}}>HARAP DIBACA</h1>
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

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <hr style={{ width: '98%', border: '1px solid grey', opacity: '0.5' }} />
                </div>
            
            {/* SUBMIT */}
            <Container>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <p style={{color:'#1CAB43', marginBottom:'4px'}}>Tugas Pendahuluan</p>
                        <h3 style={{fontSize:'18px'}}>MODUL {moduleNumber}: {moduleTitle}</h3>
                        <p style={{margin:'0px', fontSize:'13px'}}><b>Due Date: </b> &nbsp; Monday, 7 September 2023, 23:59 </p>
                        <p style={{margin:'0px', fontSize:'13px'}}><b>Time Remaining:</b> &nbsp; 1 Hour 23 Min</p>
                        <p style={{margin:'0px', fontSize:'13px'}}><b>Time Submitted:</b> &nbsp; </p>
                    </Col>
                    <Col xs='12' sm='6'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <Button href={linkSoal} target="_blank" rel="noopener noreferrer"color="primary" style={{ width: '150px' }}>Soal Jurnal</Button>
                        <Button href={linkSubmit} target="_blank" rel="noopener noreferrer" color="white" style={{ width: '150px', fontWeight:'bolder', color:'black' }}>Submit File &nbsp;<Upload size={14}/></Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}
