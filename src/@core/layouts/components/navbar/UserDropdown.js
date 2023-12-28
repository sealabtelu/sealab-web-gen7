// ** React Imports
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'

// ** Utils
import { getUserData, isUserLoggedIn } from "@utils"

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/api/user'

// ** Custom Components
import toast from 'react-hot-toast'
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  HelpCircle,
  Power,
  X
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // ** State
  const [userData] = useState(getUserData(true))

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn()) {
      const currentTime = new Date()
      const tokenExpired = new Date(parseJwt(userData.appToken).exp * 1000)
      // currentTime.setHours(currentTime.getHours() + 1)
      // currentTime.setMinutes(currentTime.getMinutes() + 59)

      if (currentTime > tokenExpired) {
        console.log(currentTime)
        console.log(tokenExpired)
        toast(t => (
          <ToastContent t={t} />
        ))
        dispatch(handleLogout())
        navigate('/login')
      }
    }
  }, [location])

  const ToastContent = ({ t }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='danger' icon={<X size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6>Session Expired</h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
          </div>
          <span>Please login again 🔑</span>
        </div>
      </div>
    )
  }
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{userData.name}</span>
          <span className="user-status">{userData.role}</span>
        </div>
        <Avatar
          content={userData.name}
          contentStyles={{ width: '40px', height: '40px' }}
          color='light-info'
          status="online"
          initials
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/student/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
