import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from 'prop-types';
import { Hello } from "../../components/Hello";

const Style = require('./home.less');


class HomeComponent extends React.Component {

    constructor(props: object) {
        super(props);
        const _this = this;
        _this.state = {}
    }

    render() {
        const _this = this;
        return (<div className={ Style.aaa }>
            <Hello compiler="TypeScript" framework="React" />
        </div>);
    }

}

/* HomeComponent.propTypes = {}

HomeComponent.defaultProps = {}; */

export default HomeComponent;