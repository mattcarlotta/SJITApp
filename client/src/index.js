import React from "react";
import ReactDOM from "react-dom";
import App from "./root";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "./styles/globals/globals.scss";

const render = Component => {
	ReactDOM.render(<Component />, document.getElementById("root"));
};

render(App);

if (module.hot) {
	module.hot.accept("./root/index.js", () => {
		const nextApp = require("./root/index.js").default; // eslint-disable-line global-require
		render(nextApp);
	});
}
