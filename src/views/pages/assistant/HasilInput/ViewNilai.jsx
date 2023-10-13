// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Utils
// import { selectThemeColors, isObjEmpty } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, getGroupDetail } from '@store/api/seelabs'

const SelectGroup = () => {
    // DUMMY DATA
    const ViewData = [
        { 
            id: 1,
            nama: 'Muhammad Tharreq',
            modul: 1,
            tp: 85,
            ta: 80,
            d1: 85,
            d2: 85,
            d3: 85,
            d4: 85,
            i1: 90,
            i2: 90,
            inputDate: '3/Oktober/2023',
            shift: 3
        },
        { 
            id: 2,
            nama: 'Harvan Nurlutfi',
            modul: 1,
            tp: 0,
            ta: 40,
            d1: 42,
            d2: 42,
            d3: 42,
            d4: 42,
            i1: 45,
            i2: 45,
            inputDate: '3/Oktober/2023',
            shift: 3
        },
        { 
            id: 3,
            nama: 'Galih Karya',
            modul: 1,
            tp: 100,
            ta: 100,
            d1: 95,
            d2: 95,
            d3: 95,
            d4: 95,
            i1: 100,
            i2: 100,
            inputDate: '3/Oktober/2023',
            shift: 3
        },
        { 
            id: 4,
            nama: 'Giovani Natienl',
            modul: 1,
            tp: 0,
            ta: 0,
            d1: 0,
            d2: 0,
            d3: 0,
            d4: 0,
            i1: 0,
            i2: 0,
            inputDate: '3/Oktober/2023',
            shift: 3
        }
    ]

    const dispatch = useDispatch()

    const {
        groups,
        dayOptions,
        shiftOptions,
        currentDSG,
        isSubmitLoading,
        isLoading } = useSelector(state => state.seelabs)

    const defaultValues = {
        day: dayOptions[0],
        shift: shiftOptions[0]
    }

    const {
        control,
        handleSubmit
    } = useForm({ defaultValues })

    const onSubmit = ({ day, shift }) => {
        dispatch(getGroupList(
            {
                day: day.value,
                shift: shift.value
            }
        ))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>View Nilai</CardTitle>
            </CardHeader>

            <CardBody>
                <Row>
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Modul</th>
                            <th>TP</th>
                            <th>TA</th>
                            <th>D1</th>
                            <th>D2</th>
                            <th>D3</th>
                            <th>D4</th>
                            <th>I1</th>
                            <th>I2</th>
                            <th>Tanggal Input</th>
                            <th>Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ViewData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.nama}</td>
                                        <td>{item.modul}</td>
                                        <td>{item.tp}</td>
                                        <td>{item.ta}</td>
                                        <td>{item.d1}</td>
                                        <td>{item.d2}</td>
                                        <td>{item.d3}</td>
                                        <td>{item.d4}</td>
                                        <td>{item.i1}</td>
                                        <td>{item.i2}</td>
                                        <td>{item.inputDate}</td>
                                        <td>{item.shift}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </Table>
                </Row>
                {isLoading && (
                    <div className='d-flex justify-content-center my-1'>
                        <Spinner />
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
export default SelectGroup
