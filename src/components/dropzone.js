// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Spinner } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'

const Dropzone = ({ value, onChange, loading }) => {
  // ** State

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: acceptedFiles => {
      onChange([...value, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = value
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    onChange([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = value.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        className='btn-icon'
        color='danger'
        size='sm'
        outline
        disabled={loading}
        onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    onChange([])
  }

  return (
    <Fragment>
      {!value.length ? (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Drop Files here or click to upload</h5>
            <p className='text-secondary'>
              Drop value here or click{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                browse
              </a>{' '}
              (PDF only)
            </p>
          </div>
        </div>
      ) : (
        <Fragment>
          <ListGroup className="my-2">{fileList}</ListGroup>
          <div className="d-flex justify-content-end">
            <Button
              className="me-1"
              color="danger"
              outline
              disabled={loading}
              onClick={handleRemoveAllFiles}
            >
              Remove
            </Button>
            <Button
              color="primary"
              disabled={loading}
              type="submit"
            >
              {loading && <Spinner color="light" size="sm" />}
              <span className="ms-50">Upload Files</span>
            </Button>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Dropzone
