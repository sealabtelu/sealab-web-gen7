import { useEffect, useState, Fragment } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getListQuestion } from "@store/api/homeAssignmentQuestion";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	Button,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Spinner,
} from "reactstrap";

// ** Styles
import "@src/assets/scss/question-list.scss";

// ** Third Party Imports File Uploader
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FileText, X, DownloadCloud } from "react-feather";
import { addAnswer } from "@store/api/homeAssignmentAnswer";

const HAQuestionList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const module = useSelector((state) => state.module);
	const homeAssignment = useSelector((state) => state.homeAssignmentQuestion);
	const { isLoading } = useSelector((state) => state.homeAssignmentAnswer);

	useEffect(() => {
		dispatch(getListQuestion());
	}, []);

	//Input File code
	const [files, setFiles] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		onDrop: (acceptedFiles) => {
			setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
		},
	});

	const handleSubmit = () => {
		dispatch(addAnswer({ file: files[0] })).then(({ payload: { status } }) => {
			if (status === 200) {
				navigate("/student/home-assignment");
			}
		});
	};

	const renderFilePreview = (file) => {
		if (file.type.startsWith("image")) {
			return (
				<img
					className="rounded"
					alt={file.name}
					src={URL.createObjectURL(file)}
					height="28"
					width="28"
				/>
			);
		} else {
			return <FileText size="28" />;
		}
	};

	const handleRemoveFile = (file) => {
		const uploadedFiles = files;
		const filtered = uploadedFiles.filter((i) => i.name !== file.name);
		setFiles([...filtered]);
	};

	const renderFileSize = (size) => {
		if (Math.round(size / 100) / 10 > 1000) {
			return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
		} else {
			return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
		}
	};

	const fileList = files.map((file, index) => (
		<ListGroupItem
			key={`${file.name}-${index}`}
			className="d-flex align-items-center justify-content-between"
		>
			<div className="file-details d-flex align-items-center">
				<div className="file-preview me-1">{renderFilePreview(file)}</div>
				<div>
					<p className="file-name mb-0">{file.name}</p>
					<p className="file-size mb-0">{renderFileSize(file.size)}</p>
				</div>
			</div>
			<Button
				color="danger"
				outline
				size="sm"
				className="btn-icon"
				onClick={() => handleRemoveFile(file)}
			>
				<X size={14} />
			</Button>
		</ListGroupItem>
	));

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};

	const renderListQuestion = () => {
		if (homeAssignment.questions?.length > 0) {
			return homeAssignment.questions.map((item, index) => {
				return (
					<Card className="question-item" key={item.id}>
						<CardHeader className="question-title">
							<div className="d-flex">
								<Avatar
									className="rounded"
									color="light-info"
									icon={<HelpCircle size={20} />}
								/>
								<div className="title">
									<h4>{`Question ${index + 1}`}</h4>
								</div>
							</div>
						</CardHeader>
						<CardBody>
							<div>
								<div dangerouslySetInnerHTML={{ __html: item.question }}></div>
							</div>
						</CardBody>
					</Card>
				);
			});
		} else {
			return <div>Tidak ada data yang tersedia.</div>;
		}
	};

	return (
		<Fragment>
			<form>
				<Card>
					<Row>
						<Col>
							<CardHeader>
								<CardTitle className="question-header">
									{`Module ${module.selectedModule.seelabsId}: ${module.selectedModule.name}`}
								</CardTitle>
							</CardHeader>
						</Col>
						<Col>
							<CardBody className="question-header">
								{`Total Question: ${homeAssignment.questions.length}`}
							</CardBody>
						</Col>
					</Row>
				</Card>
				{renderListQuestion()}
				<Card>
					<CardBody>
						<div {...getRootProps({ className: "dropzone" })}>
							<input {...getInputProps()} />
							<div className="d-flex align-items-center justify-content-center flex-column">
								<DownloadCloud size={64} />
								<h5>Drop Files here or click to upload</h5>
								<p className="text-secondary">
									Drop files here or click{" "}
									<a href="/" onClick={(e) => e.preventDefault()}>
										browse
									</a>{" "}
									thorough your machine
								</p>
							</div>
						</div>
						{files.length ? (
							<Fragment>
								<ListGroup className="my-2">{fileList}</ListGroup>
								<div className="d-flex justify-content-end">
									<Button
										className="me-1"
										color="danger"
										outline
										onClick={handleRemoveAllFiles}
									>
										Remove All
									</Button>
									<Button
										color="primary"
										disabled={isLoading}
										onClick={() => handleSubmit()}
									>
										{isLoading && <Spinner color="light" size="sm" />}
										<span className="ms-50">Upload Files</span>
									</Button>
								</div>
							</Fragment>
						) : null}
					</CardBody>
				</Card>
			</form>
		</Fragment>
	);
};

export default HAQuestionList;
