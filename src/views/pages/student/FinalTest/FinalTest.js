import { useState, useEffect, Fragment } from "react"; // Import React
import { Card, CardHeader, CardTitle, Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Lock } from "react-feather";
import { getFTSubmissions, selectModule } from "@store/api/module";
import OverlayFinalTest from "./FinalTestOverlay";

export default function FinalTest() {
  const [isOpenClicked, setIsOpenClicked] = useState(null);

  const dispatch = useDispatch();
  const { modules, isLoading } = useSelector((state) => state.module);

  useEffect(() => {
    dispatch(getFTSubmissions());
  }, []);

  const handleOpenClick = (module) => {
    dispatch(selectModule(module));
    setIsOpenClicked(module.id);
  };

  console.log(modules);

  return (
    <Fragment>
      <Card className="card-overlay-jurnal">
        {/* INFO */}
        <h1>Jurnal</h1>
        <ol type="1">
          <li>
            Jurnal dikerjakan ketika praktikum berlangsung dan dikerjakan sesuai dengan <b>arahan asisten.</b>
          </li>
          <li>
            Pengumpulan Jurnal sesuai dengan <b>arahan dari asisten</b> Laboratorium SEA.
          </li>
        </ol>
      </Card>
      {isLoading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner color="primary" />
        </div>
      ) : (
        modules.map((item, index) => (
          <Fragment key={item.id}>
            {isOpenClicked === item.id ? (
              <OverlayFinalTest
                moduleTitle={item.name}
                moduleNumber={index + 1}
                // linkSoal={module.links.soal}
              />
            ) : (
              <Card className="card-student">
                <CardHeader>
                  <CardTitle>
                    TA {index + 1} - {item.name}
                  </CardTitle>
                  {item.isOpen ? (
                    <Button color="relief-primary" onClick={() => handleOpenClick(item)}>
                      Open
                    </Button>
                  ) : (
                    <Button color="flat-dark" disabled={true} style={{ display: "flex", alignItems: "center" }}>
                      <Lock size={13} style={{ marginRight: "5px" }} /> {item.isSubmitted ? "Submitted" : "Closed"}
                    </Button>
                  )}
                </CardHeader>
              </Card>
            )}
          </Fragment>
        ))
      )}
    </Fragment>
  );
}
