import * as React from "react";
import PrimaryLayout from "../../components/Layout/PrimaryLayout";
import {Link, withRouter} from "react-router-dom";


class HomePage extends React.Component{
    render() {
        return(
            <PrimaryLayout>
                Home
            </PrimaryLayout>
        )
    }
}

export default withRouter(HomePage);