// ** React Imports
import { Fragment, useState } from "react"

// ** Third Party Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"

// ** Demo Components
import SecurityTabContent from "./SecurityTabContent"
import AccountTabContent from "./AccountTabContent"
import { Lock, User } from "react-feather"
import { useSelector } from "react-redux"

const Profile = () => {
  // ** Hooks
  const [activeTab, setActiveTab] = useState('1')
  const { isLoading } = useSelector((state) => state.user)


  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs title='Account Settings' data={[{ title: 'Account Settings' }]} />
      <Row>
        <Col xs={12}>
          <Nav pills className='mb-2'>
            <NavItem>
              <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                <User size={18} className='me-50' />
                <span className='fw-bold'>Account</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                <Lock size={18} className='me-50' />
                <span className='fw-bold'>Security</span>
              </NavLink>
            </NavItem>
          </Nav>


          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <AccountTabContent loading={isLoading} />
            </TabPane>
            <TabPane tabId='2'>
              <SecurityTabContent loading={isLoading}/>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Profile
