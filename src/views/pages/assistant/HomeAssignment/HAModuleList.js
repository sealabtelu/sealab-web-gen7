import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Input, Label } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { selectModule, getModules, setPAStatus } from '@store/api/module'

// ** Styles
import '@src/assets/scss/module-list.scss'

const HAModuleList = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const { modules, isLoading } = useSelector(state => state.module)

  useEffect(() => {
    dispatch(getModules())
  }, [])

  const renderListModule = () => {
    if (modules?.length > 0) {
      return modules.map((item, index) => {
        return (
          <div key={item.id} className='module-item'>
            <div className='d-flex'>
              <Avatar className='rounded' color='light-info' content={(index + 1).toString()} />
              <div>
                <h6 className='module-title'>Module {index + 1} : {item.name}</h6>
                <small>Total Question: {item.paCount}</small>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>

              {/* Kalo butuh label Closed/Open*/}
              {/* <Label for='switch-success' className='form-check-label'>
                Switch
              </Label> */}
              <div className='form-switch form-check-success'>
                <Input
                  type='switch'
                  checked={item.isPAOpen}
                  disabled={isLoading}
                  onChange={({ target: { checked } }) => dispatch(setPAStatus({ id: item.id, isOpen: checked }))} />
              </div>

              <Button color='relief-primary' disabled={isLoading} tag={Link} to='/assistant/preliminary-assignment/question-list' onClick={() => dispatch(selectModule(item))}>View</Button>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div>No data available</div>
      )
    }
  }

  return (
    <Card className='card-module'>
      <CardHeader>
        <CardTitle tag='h4'>Home Assignment</CardTitle>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderListModule()}</CardBody>
    </Card>
  )
}

export default HAModuleList
