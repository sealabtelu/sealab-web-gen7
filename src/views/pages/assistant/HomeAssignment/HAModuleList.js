import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Input, Label } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { selectModule, getModules } from '@store/api/module'

// ** Styles
import '@src/assets/scss/module-list.scss'

const HAModuleList = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.module)

  useEffect(() => {
    dispatch(getModules())
  }, [])

  const renderListModule = () => {
    if (store.modules?.length > 0) {
      return store.modules.map((item, index) => {
        return (
          <div key={item.id} className='module-item'>
            <div className='d-flex'>
              <Avatar className='rounded' color='light-info' content={(index + 1).toString()} />
              <div>
                <h6 className='module-title'>Module {index + 1} : {item.name}</h6>
                <small>Total Question: 0</small>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
              
              {/* Kalo butuh label Closed/Open*/}
              {/* <Label for='switch-success' className='form-check-label'>
                Switch
              </Label> */}
              <div className='form-switch form-check-success m-50'>
                <Input type='switch' id='switch-success' name='success' defaultChecked/>
              </div>


              <Button color='relief-primary' tag={Link} to='/assistant/preliminary-assignment/question-list' onClick={() => dispatch(selectModule(item))}>View</Button>
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
        <Icon.MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderListModule()}</CardBody>
    </Card>
  )
}

export default HAModuleList
