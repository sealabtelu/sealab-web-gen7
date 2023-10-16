import React, { useState, Fragment } from "react";
import {
	Card,
	Button,
	Row,
	Form,
	Col,
	Container,
	Collapse,
	CardBody,
	ListGroup,
	ListGroupItem,
	Label,
	Input,
	FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Upload, FileText, X, DownloadCloud } from "react-feather";

// ** Third Party Imports File Uploader
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";

export default function PreTestOverlay({ moduleTitle, moduleNumber }) {
	//collase
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	//Input File code
	const [files, setFiles] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		onDrop: (acceptedFiles) => {
			setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
		},
	});

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

	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = () => {};

	return (
		<Card className="card-overlay-jurnal">
			{/* SUBMIT */}
			<Container>
				<Row>
					<Col>
						{/* <h2>Tugas Pendahuluan</h2> */}
						<h3 className="title-overlay">
							<b>
								MODUL {moduleNumber}: {moduleTitle}
							</b>
						</h3>
						<p>
							<b>Due Date: </b> &nbsp;{" "}
						</p>
						<p>
							<b>Time Remaining:</b> &nbsp; 1 Hour 23 Min
						</p>
						<p>
							<b>Time Submitted:</b> &nbsp;{" "}
						</p>
					</Col>
					<Col xs="12" sm="6">
						<div className="button-container">
							<Button tag={Link} to="" color="relief-primary">
								Soal Jurnal
							</Button>
							<Button color="flat-dark" onClick={toggle}>
								Submit File{" "}
								<Upload
									size={12}
									style={{ marginLeft: "5px", color: "black" }}
								/>
							</Button>
						</div>
					</Col>
				</Row>
				<Collapse isOpen={isOpen}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						{/* Assistant Feedback */}
						<Label className="form-label" for="assistantFeedback">
							<b>Feedback for assistant</b>
						</Label>
						<Controller
							name="assistantFeedback"
							control={control}
							rules={{ required: "Please fill feedback!" }}
							render={({ field }) => (
								<Input
									placeholder=""
									invalid={errors.assistantFeedback && true}
									{...field}
								/>
							)}
						/>
						{errors && errors.assistantFeedback && (
							<FormFeedback>{errors.assistantFeedback.message}</FormFeedback>
						)}
						{/* Practicum Feedback */}
						<Label className="mt-1" for="practicumfeedback">
							<b>Feedback for Practicum</b>
						</Label>
						<Controller
							name="practicumfeedback"
							control={control}
							rules={{ required: "Please fill feedback!" }}
							render={({ field }) => (
								<Input
									placeholder=""
									invalid={errors.practicumfeedback && true}
									{...field}
								/>
							)}
						/>
						{errors && errors.practicumfeedback && (
							<FormFeedback>{errors.practicumfeedback.message}</FormFeedback>
						)}
						{/* Laboratory Feedback */}
						<Label className="mt-1" for="laboratoryfeedback">
							<b>Feedback for laboratory</b>
						</Label>
						<Controller
							name="laboratoryfeedback"
							control={control}
							rules={{ required: "Please fill feedback!" }}
							render={({ field }) => (
								<Input
									placeholder=""
									invalid={errors.laboratoryfeedback && true}
									{...field}
								/>
							)}
						/>
						{errors && errors.laboratoryfeedback && (
							<FormFeedback>{errors.laboratoryfeedback.message}</FormFeedback>
						)}
						<div className="mt-1">
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
									<Button color="relief-primary" type="submit">
										Upload Journal
									</Button>
								</div>
							</Fragment>
						) : null}
					</Form>
				</Collapse>
			</Container>
		</Card>
	);
}
