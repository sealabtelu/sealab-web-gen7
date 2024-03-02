import { useState, useEffect } from "react" // Import React
import { Card, CardHeader, CardTitle, Button, Spinner } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getPASubmissions } from "@store/api/module"
import { Lock } from "react-feather"
import OverlayHA from "./HAOverlay"

const HomeAssigment = () => {
  const [isOpenClicked, setIsOpenClicked] = useState(null)

  const handleOpenClick = (moduleId) => {
    setIsOpenClicked(moduleId)
  }

  const dispatch = useDispatch()
  const { modules, isLoading } = useSelector((state) => state.module)

  useEffect(() => {
    dispatch(getPASubmissions())
  }, [])

  return (
    <div>
      <Card className="card-overlay-jurnal">
        {/* INFO */}
        <h1>Tugas Pendahuluan</h1>
        <ol type="1">
          <li>
            Pastikan kalian sudah menonton video praktikum di Youtube channel <a target="_blank" href="https://www.youtube.com/@SEALaboratory">SEA Laboratory</a>
          </li>
          <li>
            Tugas Pendahuluan dikerjakan sesuai dengan NIM terakhir Praktikan.
            <br />
            <b>Contoh:</b> 1103211233 [mengerjakan soal NIM Ganjil]
            <br />
            <b>Contoh:</b> 1103211234 [mengerjakan soal NIM Genap]
          </li>
          <li>
            Tugas Pendahuluan dikerjakan menggunakan Template Tugas Pendahuluan
            yang dapat di akses <a target="_blank" href="https://telkomuniversityofficial-my.sharepoint.com/:w:/g/personal/yogasherlambang_student_telkomuniversity_ac_id/EbhL8XLdtQNFsF2myz1wM-UBwpKOxhaeIsYMsULGEf-pgQ?e=amCIzq">di sini</a>.
          </li>
          <li>
            Jawaban Tugas Pendahuluan diketik secara berurutan. Soal kemudian
            Jawaban.
          </li>
          <li>
            Soal TP akan diunggah setiap hari<b> Kamis sore</b>, pastikan untuk
            membaca pengumuman TP setiap hari Kamis di OA Line Lab SEA
            (@748waapd).
          </li>
          <li>
            Pengumpulan Tugas Pendahuluan harus dilakukan paling lambat pada
            hari <b>Minggu sebelum pukul 12.00 WIB</b>, melalui situs web resmi
            laboratorium SEA.
          </li>
          <li>
            Bagi praktikan yang <b>tidak mengumpulkan</b> Tugas Pendahuluan maka
            nilai praktikum modul yang bersangkutan dipotong <b>sebanyak 50%</b>
          </li>
          <li>
            <b>Keterlambatan</b> dalam mengumpulkan Tugas Pendahuluan akan
            mengakibatkan <b>pengurangan nilai</b> pada Tugas Pendahuluan di
            modul yang bersangkutan.
          </li>
        </ol>
      </Card>
      {
        isLoading ? <div className='d-flex justify-content-center my-3'>
          <Spinner color='primary' />
        </div> : modules.map((item, index) => (
          <div key={item.id}>
            {isOpenClicked === item.id && (
              <OverlayHA
                moduleTitle={item.name}
                moduleNumber={index + 1}
                item={item}
              />
            )}
            {isOpenClicked !== item.id && (
              <Card className="card-student">
                <CardHeader>
                  <CardTitle>
                    Modul {index + 1} - {item.name}
                  </CardTitle>
                  {item.isOpen && !item.isSubmitted ? (
                    <Button
                      color="relief-primary"
                      onClick={() => handleOpenClick(item.id)}
                    >
                      Open
                    </Button>
                  ) : (
                    <Button
                      color="flat-dark"
                      disabled={true}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Lock size={13} style={{ marginRight: "5px" }} /> {item.isSubmitted ? "Submitted" : "Closed"}
                    </Button>
                  )}
                </CardHeader>
              </Card>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default HomeAssigment