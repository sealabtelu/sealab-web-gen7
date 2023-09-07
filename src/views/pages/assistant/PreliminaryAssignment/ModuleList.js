import axios from 'axios'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'

const PreliminaryAssignment = () => {

  const [module, setModule] = useState([])
  useEffect(() => {
    axios.get("/module/list").then(res => {
      // Gatau knp tp harus gini anjir aneh battt
      const data = { ...res.data }
      setModule(data.data)
    })
  }, [])

  const renderListModule = () => {
    if (module.length > 0) {
      return module.map((item, index) => {
        console.log(item)
        return (
          <div key={item.id} className='module-item'>
            <div className='d-flex'>
              <Avatar className='rounded' color='light-info' content={(index + 1).toString()} />
              <div>
                <h6 className='module-title'>Module {index + 1} : {item.name}</h6>
                <small>Total Question: 0</small>
              </div>
            </div>
            <Button color='relief-primary' tag={Link} to={`/assistant/preliminary-assignment/question-list/${item.id}`}>View</Button>
            {/* <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div> */}
          </div>
        )
      })
    } else {
      return (
        <div>Tidak ada data yang tersedia.</div>
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

export default PreliminaryAssignment
