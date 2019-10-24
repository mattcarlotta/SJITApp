import React, { Fragment } from "react";
import { Card } from "antd";
import Helmet from "react-helmet";
import { Paragraph, Title } from "components/Body";

const title = "Licensing";

const ViewLicensePage = () => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<div css="padding: 0 30px 30px 30px;">
				<Title>Licensing</Title>
				<Paragraph>MIT License</Paragraph>
				<Paragraph>Copyright (c) 2019 Matt Carlotta</Paragraph>
				<Paragraph>
					Permission is hereby granted, free of charge, to any person obtaining
					a copy of this software and associated documentation files (the
					&#34;Software&#34;), to deal in the Software without restriction,
					including without limitation the rights to use, copy, modify, merge,
					publish, distribute, sublicense, and/or sell copies of the Software,
					and to permit persons to whom the Software is furnished to do so,
					subject to the following conditions:
				</Paragraph>
				<Paragraph>
					The above copyright notice and this permission notice shall be
					included in all copies or substantial portions of the Software.
				</Paragraph>
				<Paragraph>
					THE SOFTWARE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF ANY
					KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
					OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
					NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
					LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
					OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
					WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
				</Paragraph>
			</div>
		</Card>
	</Fragment>
);

export default ViewLicensePage;
