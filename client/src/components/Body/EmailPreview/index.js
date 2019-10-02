/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { FaEllipsisV, FaReply, FaStar } from "react-icons/fa";
import { FormatDate, Modal } from "components/Body";

const EmailPreview = ({ fields, handleCloseModal }) => (
	<Modal maxWidth="100%" onClick={handleCloseModal}>
		<div css="width: 100%;margin-top: 20px;padding: 20px;border: 1px dashed #e4e2e2;background-color: #fdfdfd;">
			<table css="width: 100%;">
				<tbody>
					<tr>
						<td>
							<h2>{fields.subject || "(no subject)"}</h2>
							<table css="width: 100%;">
								<tbody>
									<tr css="display: flex;	align-items: center;">
										<td css="width: 100%;">
											<table css="width: 100%;">
												<tbody>
													<tr>
														<td>
															<strong>
																{fields.sendFrom ||
																	"(missing a send to address)"}
																&nbsp;&nbsp;
															</strong>
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
										<td css="display: flex;align-items: center;white-space: nowrap;">
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
									<tr css="display: flex;align-items: center;">
										<td>
											<span>to&nbsp;</span>
											<span>
												{!isEmpty(fields.sendTo) && fields.sendTo.length > 1
													? fields.sendTo.map(email => `${email} `)
													: fields.sendTo[0] || "example@gmail.com"}
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td css="margin-top: 20px; width: 100%;">
							<table css="width: 100%">
								<tbody>
									<tr>
										<td>
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
																	__html:
																		fields.message || "<span>(empty)</span>",
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
