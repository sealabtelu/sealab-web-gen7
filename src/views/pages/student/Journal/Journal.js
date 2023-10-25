import { useState, useEffect, Fragment } from "react" // Import React
import { Card, CardHeader, CardTitle, Button, Spinner } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { Lock } from "react-feather"
import { getJSubmissions, selectModule } from "@store/api/module"
import OverlayJurnal from "./JournalOverlay"

export default function Journal() {
  const [isOpenClicked, setIsOpenClicked] = useState(null)

  const dispatch = useDispatch()
  const { modules, isLoading } = useSelector((state) => state.module)

  useEffect(() => {
    dispatch(getJSubmissions())
  }, [])

  const handleOpenClick = (module) => {
    dispatch(selectModule(module))
    setIsOpenClicked(module.id)
  }

  return (
    <Fragment>
      <Card className="card-overlay-jurnal">
        {/* INFO */}
        <h1>Jurnal</h1>
        <ol type="1">
          <li>
            Jurnal dikerjakan ketika praktikum berlangsung dan dikerjakan sesuai
            dengan <b>arahan asisten.</b>
          </li>
          <li>
            Pengumpulan Jurnal sesuai dengan <b>arahan dari asisten</b>{" "}
            Laboratorium I-Smile.
          </li>
        </ol>
      </Card>
      {
        isLoading ? <div className='d-flex justify-content-center my-3'>
          <Spinner color='primary' />
        </div> : modules.map((item, index) => (
          <Fragment key={item.id}>
            {isOpenClicked === item.id ? (
              <OverlayJurnal
                moduleTitle={item.name}
                moduleNumber={index + 1}
              // linkSoal={module.links.soal}
              />
            ) : (
              <Card className="card-student">
                <CardHeader>
                  <CardTitle>
                    Modul {index + 1} - {item.name}
                  </CardTitle>
                  {item.isOpen && !item.isSubmitted ? (
                    <Button
                      color="relief-primary"
                      onClick={() => handleOpenClick(item)}
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
          </Fragment>
        ))
      }
    </Fragment>
  )
}
