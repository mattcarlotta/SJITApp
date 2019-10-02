/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {
	FaCaretSquareDown,
	FaEllipsisV,
	FaReply,
	FaStar,
} from "react-icons/fa";
import { Dropdown, Tooltip } from "antd";
import { Bold, FormatDate, Flex, Modal, Text } from "components/Body";

const showSendTo = sendTo =>
	!isEmpty(sendTo) && sendTo.length > 1
		? sendTo.map((email, key) => (
				<p css="margin:0; padding: 0;" key={email}>
					{key < sendTo.length - 1 ? `${email}, ` : `${email}`}
				</p>
		  ))
		: sendTo[0] || "example@gmail.com";

const emailDetails = fields => (
	<div css="background: #fdfdfd; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 1px solid rgba(0,0,0,0.2); padding: 10px; max-height: 400px; overflow-y: auto;">
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: "15%",
					marginRight: 5,
				}}
			>
				from:&nbsp;
			</Text>
			<Text style={{ width: "85%" }}>{fields.sendFrom}</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: "15%",
					marginRight: 5,
				}}
			>
				to:&nbsp;
			</Text>
			<Text style={{ width: "85%" }}>{showSendTo(fields.sendTo)}</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: "15%",
					marginRight: 5,
				}}
			>
				date:&nbsp;
			</Text>
			<Text style={{ width: "85%" }}>
				<FormatDate date={fields.sendDate} format="MMMM Do YYYY, hh:mm a" />
			</Text>
		</Flex>
		<Flex>
			<Text
				style={{
					color: "#999",
					textAlign: "right",
					width: "15%",
					marginRight: 5,
				}}
			>
				subject:&nbsp;
			</Text>
			<Text style={{ width: "85%" }}>{fields.subject || "(no subject)"}</Text>
		</Flex>
	</div>
);

const EmailPreview = ({ fields, handleCloseModal }) => (
	<Modal disableClickHandler maxWidth="100%" onClick={handleCloseModal}>
		<div css="width: 100%;margin-top: 20px;padding: 20px;border: 1px dashed #e4e2e2;background-color: #fdfdfd;">
			<table css="width: 100%;">
				<tbody>
					<tr>
						<td>
							<h2>{fields.subject || "(no subject)"}</h2>
							<table css="width: 100%;">
								<tbody>
									<tr>
										<td css="width: 100%;">
											<table css="width: 100%;">
												<tbody>
													<tr>
														<td>
															<Bold>
																{fields.sendFrom ||
																	"(missing a send to address)"}
																&nbsp;&nbsp;
															</Bold>
															<a
																css="color: #222;vertical-align: top;"
																rel="noopener noreferrer"
																target="_blank"
																href="https://support.google.com/mail/answer/1311182?hl=en"
																ghelpcontext="long_header"
															>
																via
															</a>
															&nbsp;sendgrid.net&nbsp;
														</td>
													</tr>
												</tbody>
											</table>
										</td>
										<td css="white-space: nowrap;">
											<FormatDate
												date={fields.sendDate}
												format="MMMM Do YYYY, hh:mm a"
											/>
											<FaStar
												style={{
													fontSize: 12,
													marginLeft: 10,
												}}
											/>
											<FaReply
												style={{
													fontSize: 12,
													marginLeft: 10,
												}}
											/>
											<FaEllipsisV
												style={{
													fontSize: 12,
													marginLeft: 10,
												}}
											/>
										</td>
									</tr>
									<tr>
										<td css="display: inline-block; width: 100%; max-width: 550px">
											<div css="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
												<span>to&nbsp;</span>
												<span>
													{!isEmpty(fields.sendTo) && fields.sendTo.length > 1
														? fields.sendTo.map((email, key) => (
																<span key={email}>
																	{key < fields.sendTo.length - 1
																		? `${email}, `
																		: `${email}`}
																</span>
														  ))
														: fields.sendTo[0] || "example@example.com"}
												</span>
											</div>
										</td>
										<td css="display: inline-block;">
											&nbsp;
											<Tooltip
												placement="bottom"
												title="Show details"
												style={{ cursor: "pointer" }}
											>
												<Dropdown
													overlay={() => emailDetails(fields)}
													trigger={["click"]}
													placement="bottomLeft"
												>
													<FaCaretSquareDown style={{ fontSize: 12 }} />
												</Dropdown>
											</Tooltip>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td css="margin-top: 20px; width: 100%;">
							<div css="width: 100%; background-color: #FDFDFD; border-collapse: separate !important; border-spacing: 0">
								<div css="font-size: 16px; padding: 30px; vertical-align: top; display: block; width: 675px; max-width: 675px; margin: 0 auto;">
									<div css="margin-bottom: 30px; margin-top: 15px;">
										<p css="color: #2E323B;">
											<img
												css="margin-right:15px;"
												src="https://i.imgur.com/pcu86US.png"
												height="30px"
												alt="saplogo.png"
											></img>
											<img
												css="margin-right:15px;"
												src="https://i.imgur.com/Clo9cbt.png"
												height="40px"
												alt="sharkslogo.png"
											></img>
											<img
												src="https://i.imgur.com/HTcARsE.png"
												height="35px"
												alt="barracudaLogo.png"
											></img>
										</p>
									</div>
									<div css="background-color: #FFFFFF; border: 1px solid #f0f0f0;">
										<div css="font-size: 16px; padding: 30px; vertical-align: top; display: block;">
											<div
												dangerouslySetInnerHTML={{
													__html: fields.message || "<span>(empty)</span>",
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Modal>
);

EmailPreview.propTypes = {
	handleCloseModal: PropTypes.func.isRequired,
	fields: PropTypes.shape({
		message: PropTypes.string,
		sendTo: PropTypes.arrayOf(PropTypes.string),
		sendFrom: PropTypes.string,
		sendDate: PropTypes.string,
		subject: PropTypes.string,
	}),
};

export default EmailPreview;
/* eslint-enable react/no-danger */
