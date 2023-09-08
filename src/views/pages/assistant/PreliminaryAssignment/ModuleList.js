import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { selectModule, getModules } from '@store/api/module'


const ModuleList = () => {

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
            <Button color='relief-primary' tag={Link} to='/assistant/preliminary-assignment/question-list' onClick={() => dispatch(selectModule(item))}>View</Button>
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

export default ModuleList
