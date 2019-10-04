/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import sapLogo from "images/misc/sapLogoEmail.png";
import sharksLogo from "images/misc/sharksLogoEmail.png";
import barracudaLogo from "images/misc/barracudaLogoEmail.png";

const RenderMessage = ({ message }) => (
	<tr>
		<td css="width: 100%;">
			<div css="width: 100%; background-color: #FDFDFD; border-collapse: separate !important; border-spacing: 0">
				<div css="font-size: 16px; padding: 30px; vertical-align: top; display: block; width: 675px; max-width: 675px; margin: 10px auto;">
					<div css="margin-bottom: 30px; margin-top: 15px;">
						<p css="color: #2E323B;">
							<img css="margin-right:20px;" src={sapLogo} alt="sapLogo.png" />
							<img
								css="margin-right:20px;position: relative;top: -3px;"
								src={sharksLogo}
								alt="sharksLogo.png"
							/>
							<img
								css="position: relative;top: -1px;"
								src={barracudaLogo}
								alt="barracudaLogo.png"
							/>
						</p>
					</div>
					<div css="background-color: #FFFFFF; border: 1px solid #f0f0f0;">
						<div css="font-size: 16px; padding: 30px; vertical-align: top; display: block;">
							<div
								dangerouslySetInnerHTML={{
									__html:
										message ||
										`<p style="color:red;text-align: center">(empty message)</p>`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</td>
	</tr>
);

RenderMessage.propTypes = {
	message: PropTypes.string,
};

export default RenderMessage;
/* eslint-enable react/no-danger */
