// ** React Imports
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Hash, DollarSign, X, Smartphone } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'

import Cleave from "cleave.js/react"
import 'cleave.js/dist/addons/cleave-phone.id'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal }) => {
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        {/* USERNAME */}
        <div className='mb-1'>
          <Label className='form-label' for='username'>
            Username
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='username' placeholder='Harpun Jelek' />
          </InputGroup>
        </div>
        {/* PASSWORD */}
        <div className='mb-1'>
          <InputPasswordToggle className='mb-1' label='Password' htmlFor='basic-default-password' />  
        </div>
        {/* NIM */}
        <div className='mb-1'>
          <Label className='form-label' for='nim'>
            NIM
          </Label>
          <InputGroup>
            <InputGroupText>
              <Hash size={15} />
            </InputGroupText>
            <Input type='number' id='nim' />
          </InputGroup>
        </div>
        {/* NAME */}
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Name
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='name' placeholder='Harpun yang lebih Jelek' />
          </InputGroup>
        </div>        
        {/* PHONE */}
        <div className='mb-1'>
          <Label className='form-label' for='phone-number'>
            Phone Number
          </Label>
          <InputGroup>
            <InputGroupText>
              <Smartphone size={15} />
            </InputGroupText>
            {/* <Input type='number' id='phone-number' /> */}
            <Cleave
              // disabled={loading}
              // className={`form-control ${errors.phone && "is-invalid"}`}
              className="form-control"
              placeholder='0812 3456 8900'
              options={{ phone: true, phoneRegionCode: 'ID' }}
              // {...field}
            />
          </InputGroup>
        </div>
        {/* CLASSROOM */}
        <div className='mb-1'>
          <Label className='form-label' for='classroom'>
            Classroom
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='classroom' placeholder='TK-44-02' />
          </InputGroup>
        </div>
        {/* GROUP */}
        <div className='mb-1'>
          <Label className='form-label' for='group'>
            Group
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input type='number' id='group' />
          </InputGroup>
        </div>
        {/* DAY */}
        <div className='mb-1'>
          <Label className='form-label' for='day'>
            Day
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input type='number' id='day' />
          </InputGroup>
        </div>
        {/* SHIFT */}
        <div className='mb-1'>
          <Label className='form-label' for='shift'>
            Shift
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input type='number' id='shift' />
          </InputGroup>
        </div>
        <Button className='me-1' color='primary' onClick={handleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
