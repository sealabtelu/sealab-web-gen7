// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

// ** Utils
// import { selectThemeColors, isObjEmpty } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, getGroupDetail } from '@store/api/seelabs'

const SelectGroup = () => {
    // DUMMY DATA
    const BAPData = [
        { id: 1, tanggal: '03/October/2023', shift: 3, modul: 1 },
        { id: 2, tanggal: '03/October/2023', shift: 4, modul: 1 },
        { id: 3, tanggal: '04/October/2023', shift: 4, modul: 1 },
        { id: 4, tanggal: '05/October/2023', shift: 4, modul: 1 }
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
                <CardTitle tag='h4'>BAP</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='row-input-score'>
                        <Col className='mb-1' md='4' sm='12'>
                            <Label className='form-label' for='default-picker'>Pilih tanggal awal jaga</Label>
                            <Controller
                                name='date'
                                control={control}
                                defaultValue={[new Date()]}
                                render={({ field }) => (
                                <Flatpickr
                                    className='form-control'
                                    disabled={isLoading || isSubmitLoading}
                                    // options={{ enableTime: false }}
                                    {...field} />
                                )}
                            />
                        </Col>
                        <Col className='mb-1' md='4' sm='12'>
                            <Button.Ripple color='primary' type='submit' disabled={isLoading}>Find</Button.Ripple>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Shift</th>
                            <th>Modul</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            BAPData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.tanggal}</td>
                                        <td>{item.shift}</td>
                                        <td>{item.modul}</td>
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
