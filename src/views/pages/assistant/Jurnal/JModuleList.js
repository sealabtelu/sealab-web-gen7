import { Fragment, useEffect } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"
import Breadcrumbs from '@components/breadcrumbs'

// ** Icons Imports
import * as Icon from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Input
} from "reactstrap"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { getModules, setJStatus } from "@store/api/module"

// ** Styles
import "@src/assets/scss/module-list.scss"

const JModuleList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { modules, isLoading } = useSelector((state) => state.module)

  useEffect(() => {
    dispatch(getModules())
  }, [])

  const renderListModule = () => {
    if (modules?.length > 0) {
      return modules.map((item, index) => {
        return (
          <div key={item.id} className="module-item">
            <div className="d-flex">
              <Avatar
                className="rounded"
                color="light-info"
                content={(index + 1).toString()}
              />
              <div>
                <h6 className="module-title">
                  Module {index + 1} : {item.name}
                </h6>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div className="form-switch form-check-success">
                <Input
                  type="switch"
                  checked={item.isJOpen}
                  disabled={isLoading}
                  onChange={({ target: { checked } }) => dispatch(setJStatus({ id: item.id, isOpen: checked }))
                  }
                />
              </div>
            </div>
          </div>
        )
      })
    } else {
      return <div>No data available</div>
    }
  }

  return (
    <Fragment>
      <Breadcrumbs title='Journal' data={[{ title: 'Master Control' }]} />
      <Card className="card-module">
        <CardHeader>
          <CardTitle tag="h4">Journal</CardTitle>
          <Icon.MoreVertical size={18} className="cursor-pointer" />
        </CardHeader>
        <CardBody>{renderListModule()}</CardBody>
      </Card>
    </Fragment>
  )
}

export default JModuleList
