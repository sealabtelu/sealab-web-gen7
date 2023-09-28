import React, { useState } from 'react'; // Import React
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import OverlayHA from './HAOverlay';

export default function HomeAssigment() {

    const [modules, setModules] = useState([
    {
        id: "MODUL 1",
        title: "Searching",
        links: {
        soal: "https://www.soaljurnal1.com",
        submit: "https://www.submitjurnal1.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
    {
        id: "MODUL 2",
        title: "Knowledge Representation",
        links: {
        soal: "https://www.soaljurnal2.com",
        submit: "https://www.submitjurnal2.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
    {
        id: "MODUL 3",
        title: "Fuzzyfikasi",
        links: {
        soal: "https://www.soaljurnal3.com",
        submit: "https://www.submitjurnal3.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
    {
        id: "MODUL 4",
        title: "Defuzzyfikasi: Mamdani",
        links: {
        soal: "https://www.soaljurnal4.com",
        submit: "https://www.submitjurnal4.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
    {
        id: "MODUL 5",
        title: "Defuzzyfikasi: Sugeno",
        links: {
        soal: "https://www.soaljurnal5.com",
        submit: "https://www.submitjurnal5.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
    {
        id: "MODUL 6",
        title: "Algoritma Genetika",
        links: {
        soal: "https://www.soaljurnal6.com",
        submit: "https://www.submitjurnal6.com",
        },
        duedate:"Monday, 7 September 2023, 23:59"
    },
]);

    const [isOpenClicked, setIsOpenClicked] = useState(null);

    const handleOpenClick = (moduleId) => {
        setIsOpenClicked(moduleId);
    };

    return (
        <div>
        {modules.map((module) => (
            <div key={module.id}>
                {isOpenClicked === module.id && (
                    <OverlayHA
                    moduleTitle={module.title}
                    moduleNumber={module.id.split(' ')[1]}
                    // linkSoal={module.links.soal}
                    // linkSubmit={module.links.submit}
                    duedate={module.duedate}
                    />
                )}

                {isOpenClicked !== module.id && (
                    <Card className='card-student'>
                        <CardHeader>
                            <CardTitle>{`${module.id} - ${module.title}`}</CardTitle>
                            <Button color="relief-primary" onClick={() => handleOpenClick(module.id)}>Open</Button>
                        </CardHeader>
                    </Card>
                )}
            </div>
        ))}
        </div>
    );
}