/* eslint-disable react/prop-types */
import { Card, CardBody,CardHeader, CardTitle, Button, CardSubtitle, Row, Col } from "reactstrap";

export default function OverlayJurnal({ moduleTitle, lastUpdate, moduleNumber,linkSoal, linkSubmit,linkTemplate }) {
    return (
        <Card>
            {/* INFO */}
            <CardTitle className="card-title-overlay">HARAP DIBACA</CardTitle>
                <ol type="1" className=" flex flex-col gap-2 list-decimal font-normal text-xs hyphens-manual sm:text-sm">
                    <li className="">
                        Tugas Pendahuluan dikerjakan sesuai dengan NIM terakhir Praktikan.<br />
                        <b>Contoh:</b> 1103211233 [mengerjakan soal NIM Ganjil]<br />
                        <b>Contoh:</b> 1103211234 [mengerjakan soal NIM Genap]
                    </li>
                    <li className="">
                        Tugas Pendahuluan dikerjakan menggunakan Template Tugas Pendahuluan di word dan dikumpulkan dalam format PDF
                    </li>
                    <li className="">
                        Jika terdapat soal yang memerlukan jawaban untuk ditulis manual maka jawaban dapat di foto/scan dan kemudian di masukan ke dalam File Tugas Pendahuluan.
                    </li>
                    <li className="">
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

            <hr className="border-[1px] border-gray-300" />
            
            {/* SUBMIT */}
            <div className="flex justify-between py-2 gap-2">
                    <div className="flex flex-col gap-1 basis-full">
                        <p className="text-xs sm:text-sm font-normal text-[#1CAB43]">Tugas Pendahuluan</p>
                        <h3 className="text-sm sm:text-lg font-bold">MODUL {moduleNumber}: {moduleTitle}</h3>
                        <div className="flex">
                            <div className="text-slate-500 flex flex-col gap-0.5 sm:gap-1">
                                <p className="text-[10px] sm:text-xs font-semibold">Due Date &nbsp;&nbsp; </p>
                                <p className="text-[10px] sm:text-xs font-semibold">Time Remaining &nbsp;&nbsp; </p>
                                <p className="text-[10px] sm:text-xs font-semibold">Time Submitted: &nbsp;&nbsp; </p>
                            </div>
                            <div className="flex flex-col gap-0.5 sm:gap-1">
                                <p className="text-[10px] sm:text-xs font-normal">: Monday, 7 September 2023,23:59</p>
                                <p className="text-[10px] sm:text-xs font-normal">: 1 Hour 23 Min.</p>
                                <p className="text-[10px] sm:text-xs font-normal">: {lastUpdate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-40 sm:w-64 gap-2">
                        {/* <a className="p-2 bg-[#4DD7BE] text-white text-[10px] sm:text-sm rounded font-semibold shadow-md hover:shadow-none text-center" href={linkTemplate}>Template Tugas Pendahuluan</a> */}
                        <a className="p-2 bg-[#4DD7BE] text-white text-[10px] sm:text-sm rounded font-semibold shadow-md hover:shadow-none text-center" href={linkSoal}>Soal Jurnal</a>
                        <a className="p-2 bg-white text-black text-[10px] sm:text-sm rounded font-semibold hover:ring-2 hover:ring-gray-300 flex items-center justify-center gap-1 " href={linkSubmit}>Submit File <span className="material-symbols-rounded">upload</span></a>
                    </div>
            </div>
        </Card>
    )
}
