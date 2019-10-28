import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card, Col } from "antd";
import { FaFileSignature } from "react-icons/fa";
import {
	Bold,
	Button,
	CalendarContainer,
	LoadingPanel,
	WarningText,
} from "components/Body";
import { fetchAPForm } from "actions/Dashboard";
import NoForms from "./NoForms";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const warningStyle = {
	verticalAlign: "middle",
	marginTop: "15px",
	padding: "5px 0",
	borderRadius: 3,
};

const format = "MMM Do YYYY @ hh:mm a";
const simpleFormat = "MM/DD/YYYY";

class Forms extends PureComponent {
	componentDidMount = () => {
		this.props.fetchAPForm();
	};

	render = () => {
		const { apform, isLoading, push } = this.props;
		const expDate = moment(apform.expirationDate);
		const currentDate = moment();
		const startDate = moment(apform.startMonth).format(simpleFormat);
		const endDate = moment(apform.endMonth).format(simpleFormat);
		const hasExpired = expDate.toDate() < currentDate.toDate();

		return (
			<Col {...columns}>
				<Card
					bodyStyle={{ minHeight: "300px" }}
					title={
						<Fragment>
							<FaFileSignature style={iconStyle} />
							<span css="vertical-align: middle;">Forms</span>
						</Fragment>
					}
				>
					{isLoading ? (
						<LoadingPanel />
					) : (
						<CalendarContainer>
							{!isEmpty(apform) ? (
								<Fragment>
									<Button
										primary
										padding="0px"
										marginRight="0px"
										onClick={
											!hasExpired
												? () => push(`/employee/forms/view/${apform._id}`)
												: null
										}
										style={{
											cursor: hasExpired ? "auto" : "pointer",
										}}
									>
										<div>Sharks & Barracuda A/P Form</div>
										<div>
											{startDate} - {endDate}
										</div>
									</Button>
									<div css="font-size: 17px;">
										<div css="margin-top: 15px; padding: 0 5px;">
											<div>
												<Bold>Form Id:</Bold>
												{apform._id}
											</div>
											<div>
												<Bold>Expiration Date:</Bold>
												{expDate.format(format)}
											</div>
											<div>
												<Bold>Event Count:</Bold>
												{apform.eventCounts}
											</div>
											<div>
												<Bold>Notes:</Bold>
												{apform.notes || "(none)"}
											</div>
											<WarningText
												style={{
													...warningStyle,
													backgroundColor: !hasExpired ? "#2979ff" : "#f56342",
												}}
											>
												{hasExpired
													? `This form has expired and is no longer viewable.`
													: `This form will expire ${moment(expDate)
															.startOf("day")
															.fromNow()}!`}
											</WarningText>
										</div>
									</div>
								</Fragment>
							) : (
								<NoForms />
							)}
						</CalendarContainer>
					)}
				</Card>
			</Col>
		);
	};
}

Forms.propTypes = {
	apform: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		notes: PropTypes.string,
		eventCounts: PropTypes.number,
	}),
	isLoading: PropTypes.bool.isRequired,
	fetchAPForm: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	apform: state.dashboard.apform.data,
	isLoading: state.dashboard.apform.isLoading,
});

const mapDispatchToProps = {
	fetchAPForm,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Forms);
