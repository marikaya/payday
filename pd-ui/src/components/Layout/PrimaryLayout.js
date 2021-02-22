import React from "react";
import '../../global.less';
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import {Col, Layout, Row} from "antd";
import Content from "../Content/Content";
import AppLink from "../AppLink/AppLink";
import PropTypes from "prop-types";
import history from "../../history";

import "./PrimaryLayout.less";
import ZoomOutOutlined from "@ant-design/icons/lib/icons/ZoomOutOutlined";
import ShopOutlined from "@ant-design/icons/lib/icons/ShopOutlined";
import {UserOutlined, DollarOutlined, BankOutlined, BankTwoTone, ArrowRightOutlined, WalletFilled, WalletOutlined} from "@ant-design/icons";
import logoutUser from "../../service/login.service";

class PrimaryLayout extends React.Component {

    logout() {
        logoutUser();
    }


    render() {
        return (
            <Layout>
                <Header rightSide={
                    <>
                        {this.props.extraLinks}
                        <a className="header-link" onClick={this.logout}><ArrowRightOutlined/>Logout</a>
                    </>
                } loading={this.props.loading}>
                    Header
                </Header>

                <div className="page-container">
                    <Row>
                        <Col span={4}>
                            <Navigation>
                                <AppLink icon={<UserOutlined style={{fontSize: '36px', color: '#08c'}}/>} to={"/profile"}>Profile</AppLink>
                                <AppLink icon={<DollarOutlined style={{fontSize: '36px', color: '#08c'}}/>} to={"/currency"}>Currencies</AppLink>
                            </Navigation>
                        </Col>
                        <Col span={20}>
                            <div className="page-information">
                                <span className={"page-icon"}>{this.props.pageIcon}</span>
                                <span className={"page-name"}>{this.props.pageName}</span>
                            </div>
                            <Content>
                                {this.props.children}
                            </Content>
                        </Col>
                    </Row>
                </div>

            </Layout>
        );
    }
}

PrimaryLayout.propTypes = {
    loading: PropTypes.bool.isRequired,
    pageName: PropTypes.string.isRequired,
    pageIcon: PropTypes.element.isRequired,
    extraLinks: PropTypes.element.isRequired
};


export default PrimaryLayout;