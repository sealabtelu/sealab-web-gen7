// ** Styles
import "/swagger-ui-react/swagger-ui.css"

// ** Third Party Components
import { Fragment, useEffect } from "react"
import SwaggerUI from "swagger-ui-react"
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { getUserData } from "@utils"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { getSwaggerDoc } from "@store/api/swagger"

const Swagger = () => {
  const dispatch = useDispatch()
  const { appToken } = getUserData()
  const { swaggerDoc, isLoading } = useSelector((state) => state.swagger)

  useEffect(() => {
    dispatch(getSwaggerDoc())
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='Swagger UI' data={[{ title: 'API Docs' }]} />
      <Card>
        <CardHeader>
          <CardTitle>
            Endpoint List
          </CardTitle>
        </CardHeader>
        <CardBody>
          {
            isLoading ? <div className='d-flex justify-content-center my-3'>
              <Spinner color='primary' />
            </div> : <SwaggerUI
              filter
              spec={swaggerDoc}
              docExpansion="none"
              requestInterceptor={(request) => {
                request.headers['Authorization'] = `bearer ${appToken}`
                request.url = import.meta.env.VITE_API_BASE_URL + request.url.replace(/^https?:\/\/[^/]+/, '')
                return request
              }}
            />
          }
        </CardBody>
      </Card>
    </Fragment>
  )
}
export default Swagger
