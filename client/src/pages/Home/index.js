import React from 'react';
import Helmet from 'react-helmet';
import logo from 'images/mernLogo.png';
import {
	homeContainer,
	logoContainer,
	logoStyle,
	textInfo,
} from './styles.scss';

const Home = () => (
	<div className={homeContainer}>
		<Helmet title="Home" />
		<div className={logoContainer}>
			<img className={logoStyle} src={logo} alt="mernLogo.png" />
			<h1 className={textInfo}>React SSR Kit</h1>
			<h1 className={textInfo}>Edit files in ./src and save to reload.</h1>
		</div>
	</div>
);

export default Home;
