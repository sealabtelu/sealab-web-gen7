// ** Styles
import '@src/assets/scss/pilih-group.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import Select from 'react-select'
import { ChevronDown } from 'react-feather'
import { NavLink } from 'react-router-dom'
import DataTable, { createTheme } from "react-data-table-component"

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
import { useSkin } from "@hooks/useSkin"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, Label, Button, Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getInputResult } from '@store/api/seelabs'

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const InputResult = () => {
  const { skin } = useSkin()
  const dispatch = useDispatch()

  const {
    groups,
    moduleOptions,
    isSubmitLoading,
    isLoading } = useSelector(state => state.seelabs)


  const basicColumns = [
    {
      name: 'Group',
      maxWidth: '150px',
      center: true,
      selector: row => row.group
    },
    {
      name: 'Names',
      minWidth: '300px',
      cell: ({ names }) => (
        <ListGroup flush style={{ width: '100%' }}>
          {names.map((name, index) => (
            <ListGroupItem
              key={index}
              style={{ backgroundColor: 'transparent', paddingLeft: '0px' }}>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      )
    },
    {
      name: 'Action',
      button: true,
      minWidth: '300px',
      cell: row => (
        <NavLink to="/assistant/select-group/input-score">
          <Button.Ripple
            color='primary'
            disabled={true}
          // onClick={() => dispatch(getGroupDetail({ ...currentDSG, group: row.group }))}
          >
            Input
          </Button.Ripple>
        </NavLink>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Input Result</CardTitle>
      </CardHeader>

      <CardBody>
        <Row className='row-input-score'>
          {/* FIELD INI GA DIPAKAI SEHARUSNYA */}
          <Col className='mb-1' md='4' sm='12'>
            <Label className='form-label'>Select Module</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              name='clear'
              options={moduleOptions}
              isClearable
              disabled={isLoading || isSubmitLoading}
              onChange={({ value }) => {
                dispatch(getInputResult({ module: value }))
              }}
            />
          </Col>
        </Row>
        <Row>
          <DataTable
            noHeader
            data={groups}
            columns={basicColumns}
            progressPending={isLoading}
            theme={skin}
            className="react-dataTable my-1"
            sortIcon={<ChevronDown size={10} />}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            progressComponent={
              <div className="d-flex justify-content-center my-1">
                <Spinner color="primary" />
              </div>
            }
          />
        </Row>
      </CardBody>

    </Card>
  )
}
export default InputResult
