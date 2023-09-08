import React, { useState } from 'react'; // Import React
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import OverlayJurnal from "./OverlayJurnal";

const modules = [
    {
        id: "MODUL 1",
        title: "Searching",
        links: {
        soal: "https://www.soaljurnal1.com",
        submit: "https://www.submitjurnal1.com",
        },
    },
    {
        id: "MODUL 2",
        title: "Knowledge Representation",
        links: {
        soal: "https://www.soaljurnal2.com",
        submit: "https://www.submitjurnal2.com",
        },
    },
    {
        id: "MODUL 3",
        title: "Fuzzyfikasi",
        links: {
        soal: "https://www.soaljurnal3.com",
        submit: "https://www.submitjurnal3.com",
        },
    },
    {
        id: "MODUL 4",
        title: "Defuzzyfikasi: Mamdani",
        links: {
        soal: "https://www.soaljurnal4.com",
        submit: "https://www.submitjurnal4.com",
        },
    },
    {
        id: "MODUL 5",
        title: "Defuzzyfikasi: Sugeno",
        links: {
        soal: "https://www.soaljurnal5.com",
        submit: "https://www.submitjurnal5.com",
        },
    },
    {
        id: "MODUL 6",
        title: "Algoritma Genetika",
        links: {
        soal: "https://www.soaljurnal6.com",
        submit: "https://www.submitjurnal6.com",
        },
    },
];

export default function Jurnal() {
    const [isOpenClicked, setIsOpenClicked] = useState(null);

    const handleOpenClick = (moduleId) => {
        setIsOpenClicked(moduleId);
    };

    return (
        <div>
        {modules.map((module) => (
            <div key={module.id}>
                {isOpenClicked === module.id && (
                    <OverlayJurnal
                    moduleTitle={module.title}
                    moduleNumber={module.id.split(' ')[1]}
                    linkSoal={module.links.soal}
                    linkSubmit={module.links.submit}
                    />
                )}

                {isOpenClicked !== module.id && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{`${module.id} - ${module.title}`}</CardTitle>
                            <Button color="primary" onClick={() => handleOpenClick(module.id)}>Open</Button>
                        </CardHeader>
                    </Card>
                )}
            </div>
        ))}
        </div>
    );
}
