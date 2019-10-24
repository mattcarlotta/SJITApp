import React, { Fragment } from "react";
import { Card } from "antd";
import Helmet from "react-helmet";
import { Paragraph, Title } from "components/Body";

const title = "Privacy Policy";

const style = { fontSize: 18 };

const ViewPrivacyPage = () => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<div css="padding: 0 30px 30px 30px;">
				<Title>PRIVACY POLICY</Title>
				<Paragraph>
					This Privacy Policy explains how SJS Ice Team (collectively, the
					&#34;Sharks Ice Team,&#34; the &#34;Ice Team&#34;, &#34;we,&#34;
					&#34;our,&#34; &#34;us&#34;) and its affiliates use information in
					operating this website and any other online service that displays or
					provides an authorized link to this Privacy Policy (collectively, our
					&#34;Services&#34;). Please note that this Privacy Policy does not
					apply to the websites, apps, or services of the SJS Ice Team, which
					are governed by the individual privacy policies. By using our
					Services, you consent to the practices described in this Privacy
					Policy. If you have any questions about this Privacy Policy, please
					contact us at using our Contact Us form.
				</Paragraph>
				<Title style={style}>
					Information We Collect or Receive When You Use Our Services.
				</Title>
				<Paragraph>
					The information we collect and receive is: Information You Provide
					Directly. We receive the information you choose to provide when using
					our Services. For example, when you register for our Services, you may
					be asked to provide information about yourself including: Your first
					and last name, email address, and an encrypted password when you use
					of our Services. We do not collect nor store any other information via
					cookies, web beacons, nor third party services and technologies. We
					also do not use the names or email addresses submitted in these
					circumstances for any purpose other than sending an email on your
					behalf, unless we obtain your consent or the recipient&#39;s consent.
				</Paragraph>
				<Paragraph>
					We also may collect or receive information when you use our Services.
					We may receive: Log information. This is information we automatically
					collect and store when you use our Services. It may include, for
					example: Information about your interactions with our Services,
					including the content you view, the date on which you accessed our
					Services, and information in similar technologies. Information about
					how you access our Services, including your browser or operating
					system, your Internet Protocol (&#34;IP&#34;) address, and the
					websites you visit before and after visiting our Services. Device
					information. This is information we automatically collect and store
					concerning the device you use when you access our Services. (Note that
					by &#34;device,&#34; we mean anything you use to access our Services).
					Device information may include, for example: The type of device you
					are using (e.g., your particular brand of phone or tablet); Certain
					device identifiers which may be unique to your device; and Your
					Internet service provider. Location information.
				</Paragraph>
				<Title style={style}>
					How We Use the Information We Collect or Receive.
				</Title>
				<Paragraph>
					The information we collect and receive is used for the following
					purposes: To provide our Services. We use the information we collect
					or receive to provide you with the Services you use or request. For
					example, we use this information to: Create accounts; Provide
					technical support and respond to user inquiries; Send you electronic
					and other marketing communications that may be tailored to your
					preferences and interests; Notify you about updates to our Services or
					send other communications that are relevant to your use of our
					Services; and Enhance our ability to detect and prevent fraud and
					potentially illegal activities in connection with our Services and
					otherwise enforce our Terms of Service.
				</Paragraph>
				<Title style={style}>Security.</Title>
				<Paragraph>
					We have adopted physical, technical, and administrative safeguards to
					help protect against theft, loss, misuse, and unauthorized access to
					or disclosure of the information we collect and receive. However,
					please note that no data transmission or storage can be guaranteed to
					be 100% secure. As a result, while we strive to protect your
					information and privacy, we cannot and do not guarantee or warrant the
					security of any information you disclose or transmit to our Services
					and cannot be responsible for the theft, destruction, or inadvertent
					disclosure of your information, or any other disclosures out of our
					control. Your online access to some of your information may be
					protected with a password that you select. We strongly recommend that
					you do not disclose your password to anyone. We will never ask you for
					your password in any unsolicited communication (such as letters, phone
					calls, or email messages).
				</Paragraph>
				<Title style={style}>Changes To This Privacy Policy.</Title>
				<Paragraph>
					We may update this Privacy Policy from time to time to reflect changes
					in our privacy practices, so we encourage you to review this Privacy
					Policy periodically. If we make significant changes to this Privacy
					Policy, we will provide appropriate notice to you.
				</Paragraph>
				<Title style={style}>Contact Us.</Title>
				<Paragraph>
					If you have any questions about this Privacy Policy or our privacy
					practices, please contact us at using the Contact Us form.
				</Paragraph>
				<Title style={style}>Cookies.</Title>
				<Paragraph>
					Our Services use online technologies called &#34;cookies,&#34; as well
					as other local storage technologies. This section explains what these
					technologies are and how they may be used. Cookies and Other Local
					Storage Technologies Generally speaking, &#34;cookies&#34; are text
					files that are placed in your device&#39;s browser, and that can be
					used to help recognize your browser across different web pages,
					websites, and browsing sessions. Cookies are stored on your device or
					in &#34;local storage.&#34; We also use other types of local storage
					technologies, such as Local Shared Objects (sometimes called
					&#34;Flash cookies&#34;), in connection with our Services. These
					technologies are similar to cookies in that they are stored on your
					device and can be used to maintain information about your activities
					and preferences. However, these other local storage technologies may
					use parts of your device other than your browser, which means you may
					not be able to control their use using the browser tools and settings
					you use to control browser cookies. Your browser&#39;s privacy
					controls may enable you to manage other types of local storage. Our
					Services may use cookies or other local storage technologies in
					combination with other information about you to enhance and
					personalize your experience on our Services (or elsewhere online),
					including: to help authenticate you when you use our Services and to
					remember your preferences.
				</Paragraph>
			</div>
		</Card>
	</Fragment>
);

export default ViewPrivacyPage;
