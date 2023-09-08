import React, { useState } from 'react'; // Import React
import { Card, CardBody,CardHeader, CardTitle, Button, CardSubtitle, Row, Col } from "reactstrap";
import OverlayJurnal from "./OverlayJurnal";

const moduleTitle = {
    "MODUL 1": "Searching",
    "MODUL 2": "Knowledge Representation",
    "MODUL 3": "Fuzzyfikasi",
    "MODUL 4": "Defuzzyfikasi: Mamdani",
    "MODUL 5": "Defuzzyfikasi: Sugeno",
    "MODUL 6": "Algoritma Genetika",
}

export default function Jurnal() {
    const [isOpenClicked, setIsOpenClicked] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    const linkSoal = {
        "MODUL 1": "https://www.soaltp1.com",
        "MODUL 2": "https://www.soaltp2.com",
        "MODUL 3": "https://www.soaltp3.com",
        "MODUL 4": "https://www.soaltp4.com",
        "MODUL 5": "https://www.soaltp5.com",
        "MODUL 6": "https://www.soaltp6.com",
    }

    const linkSubmit = {
        "MODUL 1": "https://www.submittp1.com",
        "MODUL 2": "https://www.submittp2.com",
        "MODUL 3": "https://www.submittp3.com",
        "MODUL 4": "https://www.submittp4.com",
        "MODUL 5": "https://www.submittp5.com",
        "MODUL 6": "https://www.submittp6.com",
    }

    const handleOpenClick = (moduleId) => {
        setIsOpenClicked(moduleId);
        setSelectedModule(moduleId);
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 1 - {moduleTitle["MODUL 1"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 2 - {moduleTitle["MODUL 2"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 3 - {moduleTitle["MODUL 3"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 4 - {moduleTitle["MODUL 4"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 5 - {moduleTitle["MODUL 5"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>MODUL 6 - {moduleTitle["MODUL 6"]}</CardTitle>
                    <Button color="primary">Open</Button>
                </CardHeader>
            </Card>
            
        </div>
    );
};

