import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { Card } from "antd";
import { FaBug } from "react-icons/fa";
import { Link } from "components/Navigation";
import { BackButton, Center } from "components/Body";

export const NotFound = ({ goBack }) => (
	<Fragment>
		<Helmet title="Page Not Found" />
		<Card title="Page Not Found">
			<div css="margin-bottom: 80px;margin-top: 20px;">
				<Center>
					<div css="font-size: 150px;margin-bottom: 0px;color: #025f6d; padding: 0;">
						<FaBug
							style={{
								position: "relative",
								fontSize: 120,
								top: 10,
							}}
						/>{" "}
						<span>404</span>
					</div>
					<div css="font-size: 32px;font-weight: bold;margin-top: -30px;margin-bottom: 20px;letter-spacing: 2px; color: #025f6d;">
						Page not found
					</div>
					<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;">
						We&#39;re sorry, the page you requested could not be found. Please
						go back to the previous page or{" "}
						<Link
							style={{ padding: 0, margin: 0 }}
							blue
							to="/employee/contact-us"
						>
							Contact Us
						</Link>
						.
					</div>
					<BackButton
						style={{ margin: "0 auto", width: 120 }}
						push={goBack}
						title="Go Back"
					/>
				</Center>
			</div>
		</Card>
	</Fragment>
);

NotFound.propTypes = {
	goBack: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ goBack },
)(NotFound);
