// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Table, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupList, getGroupDetail } from '@store/api/seelabs'

const SelectGroup = () => {
    const dispatch = useDispatch()

    const {
        groups,
        moduleOptions,
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
                <CardTitle tag='h4'>Hasil Input</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='row-input-score'>
                        {/* FIELD INI GA DIPAKAI SEHARUSNYA */}
                        <Col className='mb-1' md='2' sm='4'>
                            <Label className='form-label'>INI DIHAPUS AJA NANTI PUN</Label>
                            <Controller
                                name='day'
                                control={control}
                                render={({ field }) => (
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={dayOptions}
                                    isClearable
                                    disabled={isLoading}
                                    {...field}
                                />
                                )}
                            />
                        </Col>
                        <Col className='mb-1' md='2' sm='4'>
                            <Label className='form-label'>INI DIHAPUS AJA NANTI PUN</Label>
                            <Controller
                                name='shift'
                                control={control}
                                render={({ field }) => (
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={shiftOptions}
                                    isClearable
                                    disabled={isLoading}
                                    {...field}
                                />
                                )}
                            />
                        </Col>
                        {/* FIELD INI GA DIPAKAI SEHARUSNYA */}

                        <Col className='mb-1' md='4' sm='12'>
                            <Label className='form-label'>Select Module</Label>
                            <Controller
                                name='module'
                                control={control}
                                defaultValue={moduleOptions[0]}
                                render={({ field }) => (
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    name='clear'
                                    options={moduleOptions}
                                    isClearable
                                    disabled={isLoading || isSubmitLoading}
                                    {...field}
                                />
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
                            <th>Group</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isObjEmpty(groups) && !isLoading &&
                            groups.map((item) => {
                            return item.names.map((name, index) => {
                                return (
                                <tr key={index}>
                                    {index === 0 && <td rowSpan={item.names.length} scope="row">{item.idGroup}</td>}
                                    <td>{name}</td>
                                    {index === 0 &&
                                    <td rowSpan={item.names.length} scope="row">
                                        <NavLink to="/assistant/hasil-input/view-nilai">
                                        <Button.Ripple
                                            style={{marginRight: '8px'}}
                                            color='primary'
                                            disabled={isLoading}
                                            onClick={() => dispatch(getGroupDetail({ ...currentDSG, group: item.idGroup }))}
                                        >
                                            View
                                        </Button.Ripple>
                                        </NavLink>
                                        <NavLink to="/assistant/hasil-input/update-score">
                                        <Button.Ripple
                                            style={{marginRight: '8px'}}
                                            color='info'
                                            disabled={isLoading}
                                            onClick={() => dispatch(getGroupDetail({ ...currentDSG, group: item.idGroup }))}
                                        >
                                            Update
                                        </Button.Ripple>
                                        </NavLink>
                                        <NavLink to="/">
                                        <Button.Ripple
                                            color='danger'
                                            disabled={isLoading}
                                            onClick={() => dispatch(getGroupDetail({ ...currentDSG, group: item.idGroup }))}
                                        >
                                            Delete
                                        </Button.Ripple>
                                        </NavLink>
                                    </td>
                                    }
                                </tr>
                                )
                            })
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
