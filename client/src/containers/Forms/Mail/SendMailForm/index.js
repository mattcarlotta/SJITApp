import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactQuill from "react-quill";
import isEmpty from "lodash/isEmpty";
import FroalaEditor from "react-froala-wysiwyg";
import { Card, Form, Transfer } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	BackButton,
	FormContainer,
	Label,
	SubmitButton,
} from "components/Body";
import {
	Errors,
	FieldGenerator,
	FormTitle,
	LoadingForm,
} from "components/Forms";
import { fieldUpdater } from "utils"; // fieldValidator, parseFields
import { fetchMemberNames } from "actions/Members";
import fields from "./Fields";

const title = "Send Mail";

export class SendMailForm extends Component {
	state = {
		fields,
		errors: "",
		isLoading: true,
		isSubmitting: false,
		message: "",
		members: [],
		targetKeys: [],
	};

	static getDerivedStateFromProps = ({ memberNames, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(memberNames)) {
			return {
				members: memberNames,
				fields: state.fields.map(field => ({ ...field, disabled: false })),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		this.props.fetchMemberNames();
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	filterOption = (inputValue, option) =>
		option.name.toLowerCase().includes(inputValue.toLowerCase());

	handleTransferChange = targetKeys => this.setState({ targetKeys });

	handleEditorChange = value => this.setState({ message: value });

	handleSubmit = e => {
		e.preventDefault();
		console.log(JSON.stringify(this.state, null, 4));
		// const { validatedFields, errors } = fieldValidator(this.state.fields);

		// this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
		// 	const { fields: formFields } = this.state;
		// 	if (!errors) {
		// 		// const parsedFields = parseFields(formFields);
		// 		// this.props.createForm(parsedFields);
		// 	}
		// });
	};

	render = () => (
		<Card
			extra={
				<BackButton push={this.props.push} location="/employee/forms/viewall" />
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out all of the form fields below."
				/>
				{this.state.isLoading ? (
					<LoadingForm rows={5} />
				) : (
					<form onSubmit={this.handleSubmit}>
						<Form.Item style={{ height: 350 }}>
							<Label label="Send To:" />
							<Transfer
								listStyle={{
									width: "46%",
									height: 300,
								}}
								rowKey={record => record._id}
								dataSource={this.state.members}
								filterOption={this.filterOption}
								targetKeys={this.state.targetKeys}
								onChange={this.handleTransferChange}
								render={item => item.name}
								showSearch
							/>
							{this.state.errors && <Errors>{this.state.errors}</Errors>}
						</Form.Item>
						<FieldGenerator
							fields={this.state.fields}
							onChange={this.handleChange}
						/>
						<Form.Item style={{ height: 400 }}>
							<Label label="Message:" />
							<FroalaEditor
								tag="textarea"
								model={this.state.message}
								config={{
									placeholderText: "Type a message...",
									toolbarButtons: {
										moreText: {
											buttons: [
												"bold",
												"italic",
												"underline",
												"strikeThrough",
												"subscript",
												"superscript",
												"fontFamily",
												"fontSize",
												"textColor",
												"backgroundColor",
												"insertLink",
												"quote",
											],
											buttonsVisible: 3,
										},
										moreParagraph: {
											buttons: [
												"alignLeft",
												"alignCenter",
												"alignRight",
												"alignJustify",
												"formatOLSimple",
												"formatOL",
												"formatUL",
												"paragraphFormat",
												"paragraphStyle",
												"lineHeight",
												"outdent",
												"indent",
												"insertHR",
											],
											buttonsVisible: 3,
										},
										moreMisc: {
											buttons: ["undo", "redo", "selectAll", "clearFormatting"],
											align: "right",
											buttonsVisible: 2,
										},
									},
								}}
								onModelChange={this.handleEditorChange}
							/>
						</Form.Item>
						<SubmitButton title="Send" isSubmitting={this.state.isSubmitting} />
					</form>
				)}
			</FormContainer>
		</Card>
	);
}

/*
<ReactQuill
  theme="snow"
  value={this.state.message}
  modules={{
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["color", "background"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  }}
  formats={[
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
  ]}
  onChange={this.handleEditorChange}
/>
*/
/*
{this.state.isLoading ? (
  <LoadingForm rows={4} />
) : (
  <Fragment>
    <FieldGenerator
      fields={this.state.fields}
      onChange={this.handleChange}
    />

  </Fragment>
)}
*/

SendMailForm.propTypes = {
	fetchMemberNames: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	memberNames: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			email: PropTypes.string,
		}),
	),
	serverMessage: PropTypes.string,
	// sendNewMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	memberNames: state.members.names,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	// createForm,
	fetchMemberNames,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendMailForm);
