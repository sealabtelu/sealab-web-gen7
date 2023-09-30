import React, { useState, useEffect } from "react"; // Import React
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import OverlayJurnal from "./JournalOverlay";
import { useDispatch, useSelector } from "react-redux";
import { getModules } from "@store/api/module";

export default function Journal() {
	const [isOpenClicked, setIsOpenClicked] = useState(null);

	const handleOpenClick = (moduleId) => {
		setIsOpenClicked(moduleId);
	};

	const dispatch = useDispatch();
	const module = useSelector((state) => state.module);

	useEffect(() => {
		dispatch(getModules());
	}, []);

	return (
		<div>
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
			{module.modules.map((item, index) => (
				<div key={item.id}>
					{isOpenClicked === item.id && (
						<OverlayJurnal
							moduleTitle={item.name}
							moduleNumber={index + 1}
							// linkSoal={module.links.soal}
						/>
					)}

					{isOpenClicked !== item.id && (
						<Card className="card-student">
							<CardHeader>
								<CardTitle>
									Modul {index + 1} - {item.name}
								</CardTitle>
								<Button
									color="relief-primary"
									onClick={() => handleOpenClick(item.id)}
								>
									Open
								</Button>
							</CardHeader>
						</Card>
					)}
				</div>
			))}
		</div>
	);
}
