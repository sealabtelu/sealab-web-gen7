import React, { useState, useEffect } from "react"; // Import React
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import OverlayHA from "./HAOverlay";
import { useDispatch, useSelector } from "react-redux";
import { getModules } from "@store/api/module";
import { Lock } from "react-feather";
import styled from "styled-components";

export default function HomeAssigment() {
	const [isOpenClicked, setIsOpenClicked] = useState(null);

	const handleOpenClick = (moduleId) => {
		setIsOpenClicked(moduleId);
	};

	const dispatch = useDispatch();
	const module = useSelector((state) => state.module);

	useEffect(() => {
		dispatch(getModules());
	}, []);

	const status = [true, false, true, true, false, true];

	return (
		<div>
			<Card className="card-overlay-jurnal">
				{/* INFO */}
				<h1>Tugas Pendahuluan</h1>
				<ol type="1">
					<li>
						Tugas Pendahuluan dikerjakan sesuai dengan NIM terakhir Praktikan.
						<br />
						<b>Contoh:</b> 1103211233 [mengerjakan soal NIM Ganjil]
						<br />
						<b>Contoh:</b> 1103211234 [mengerjakan soal NIM Genap]
					</li>
					<li>
						Tugas Pendahuluan dikerjakan menggunakan Template Tugas Pendahuluan
						di word dan dikumpulkan dalam format PDF
					</li>
					<li>
						Jika terdapat soal yang memerlukan jawaban untuk ditulis manual maka
						jawaban dapat di foto/scan dan kemudian di masukan ke dalam File
						Tugas Pendahuluan.
					</li>
					<li>
						Jawaban Tugas Pendahuluan diketik secara berurutan. Soal kemudian
						Jawaban.
					</li>
					<li>
						Format penamaan file Tugas Pendahuluan sebagai berikut:
						<br />
						<b>TP_NAMA_NIM_MODUL_HARI_SHIFT&shy;_KELOMPOK</b>
						<br />
						<b>
							Contoh: TP_MUHAMMAD HILMY AZIZ_1103190001_MODUL 1_RABU_SHIFT 2_13
						</b>
					</li>
					<li>
						Soal TP akan diunggah setiap hari<b> Kamis sore</b>, pastikan untuk
						membaca pengumuman TP setiap hari Kamis di OA Line Lab I-Smile
						(@qup6728v).
					</li>
					<li>
						Pengumpulan Tugas Pendahuluan harus dilakukan paling lambat pada
						hari <b>Minggu sebelum pukul 12.00 WIB</b>, melalui situs web resmi
						laboratorium I-Smile.
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
			{module.modules.map((item, index) => (
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
								{status[index] === true ? (
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
										<Lock size={13} style={{ marginRight: "5px" }} /> Closed
									</Button>
								)}
							</CardHeader>
						</Card>
					)}
				</div>
			))}
		</div>
	);
}
