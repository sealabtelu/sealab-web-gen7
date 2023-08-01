import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

const tugasPendahuluan = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>MODUL 1 - Searching</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Last edited: Sat, 13 July 19:20</CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MODUL 2</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Knowledge Representation</CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MODUL 3</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Logika Fuzzy - Fuzzifikasi</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default tugasPendahuluan;
