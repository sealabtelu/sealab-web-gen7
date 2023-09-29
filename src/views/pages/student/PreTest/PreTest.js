import React, { useState,useEffect } from 'react'; // Import React
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import PreTestOverlay from "./PreTestOverlay"
import { useDispatch, useSelector } from 'react-redux'
import { getModules } from '@store/api/module';


export default function PreTest() {

    const [isOpenClicked, setIsOpenClicked] = useState(null);

    const handleOpenClick = (moduleId) => {
        setIsOpenClicked(moduleId);
    };

    const dispatch = useDispatch()
    const module = useSelector(state => state.module)

    useEffect(() => {
        dispatch(getModules())
    }, [])

    return (
        <div>
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
        </Card>
        {module.modules.map((item, index) => (
            <div key={item.id}>
            {isOpenClicked === item.id && (
                <PreTestOverlay
                moduleTitle={item.name}
                moduleNumber={index + 1}
                item={item}
                />
            )}

            {isOpenClicked !== item.id && (
                <Card className='card-student'>
                    <CardHeader>
                        <CardTitle>Modul {index + 1} - {item.name}</CardTitle>
                        <Button color="relief-primary" onClick={() => handleOpenClick(item.id)}>Open</Button>
                    </CardHeader>
                </Card>
            )}
        </div>
        ))}
        </div>
    );
}