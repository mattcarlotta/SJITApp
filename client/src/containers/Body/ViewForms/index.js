import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaFileSignature } from "react-icons/fa";
import Table from "components/Body/Table";
import QueryHandler from "components/Navigation/QueryHandler";
import { deleteForm, fetchForms, resendMail } from "actions/Forms";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Forms";

export const ViewForms = ({
	data,
	deleteForm,
	fetchForms,
	resendMail,
	...rest
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card
			title={
				<Fragment>
					<FaFileSignature
						style={{
							verticalAlign: "middle",
							marginRight: 10,
							fontSize: 20,
						}}
					/>
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<QueryHandler {...rest}>
				{props => (
					<Fragment>
						<Filters {...props} {...rest} />
						<Table
							{...rest}
							{...props}
							columns={columns}
							data={data}
							deleteAction={deleteForm}
							fetchData={fetchForms}
							editLocation="forms"
							viewLocation="forms"
							sendMail={resendMail}
						/>
					</Fragment>
				)}
			</QueryHandler>
		</Card>
	</Fragment>
);

ViewForms.propTypes = {
	deleteForm: PropTypes.func,
	fetchForms: PropTypes.func.isRequired,
	push: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			seasonId: PropTypes.string,
			startMonth: PropTypes.string,
			endMonth: PropTypes.string,
			expirationDate: PropTypes.string,
			sendEmailNotificationsDate: PropTypes.string,
			sentEmails: PropTypes.bool,
		}),
	),
	isLoading: PropTypes.bool.isRequired,
	resendMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	data: state.forms.data,
	isLoading: state.forms.isLoading,
	totalDocs: state.forms.totalDocs,
});

const mapDispatchToProps = {
	deleteForm,
	fetchForms,
	push,
	resendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewForms);
