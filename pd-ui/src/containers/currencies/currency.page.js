import * as React from "react";
import {
  fetchCurrencies,
  fetchAvailableCurrencies,
} from "../../api/currency.api";
import PrimaryLayout from "../../components/Layout/PrimaryLayout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CurrencyPanel from "../../components/CurrencyPanel/Currency";
import { Col, Row, Modal, Select, Input, Button } from "antd";
import Basket from "../../components/Basket/Basket";
import { formatCurrency, getCurrency } from "country-currency-map";
import {
  basketClear,
  basketItemAdded,
  basketItemRemoved,
  basketList,
} from "../../action/basket.action";
import {
  UserOutlined,
  DollarOutlined,
  BankOutlined,
  BankTwoTone,
  ArrowRightOutlined,
  WalletFilled,
  WalletOutlined,
  MoneyCollectTwoTone,
} from "@ant-design/icons";
import Form from "antd/lib/form/Form";
import './currency.page.less';
import { fetchBalances } from "../../api/balance.api";

const depositForm = (currencies, depositMoney) => {
  let options = [];

  for (let i in currencies) {
    let obj = currencies[i];
    console.log(getCurrency(obj.key));
    options.push({
      key: obj.key,
      text: getCurrency(obj.key).name,
    });
  }

  return (
    <Form onFinish={(e) => depositMoney(e)}>
      <Form.Item name="deposit">
        <Input.Group compact>
          <Form.Item name={["deposit", "currency"]} label="Currency">
            <Select style={{ width: "150px", marginRight: "10px" }}>
              {options.map((c) => (
                <Select.Option key={c.key}>{c.text}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name={["deposit", "amount"]} label="Amount">
            <Input type="number" />
          </Form.Item>
        </Input.Group>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Buy
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

class CurrencyPage extends React.Component {
  state = {
    currencies: null,
    visible: false,
    balances: null,
  };

  componentDidMount() {
    this.props.fetchCurrencies().then((data) => {
      this.setState({
        currencies: data.data,
      });
    });

    this.props.fetchBalances().then((data) => {
      this.setState({
        balances: data.data,
      });
    });
  }

  depositMoney = (e) => {
    console.log(e);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  constructor(props) {
    super(props);

    this.onCurrencyBuy = this.onCurrencyBuy.bind(this);

    this.props.basketClear();
  }

  onCurrencyBuy = (targetCurrency, baseCurrency, value) => {
    this.props.basketItemAdded(targetCurrency, {
      targetCurrency,
      baseCurrency,
      value,
    });
  };

  onDepositClicked = () => {
    this.props.fetchCurrencies().then((data) => {
      this.setState({
        currencies: data.data,
        visible: true,
      });
    });
  };

  render() {
    let { currencies } = this.state;

    let rates = {};

    if (currencies) {
      for (let c in currencies) {
        let obj = currencies[c];
        rates[obj.key] = obj.rates;
      }
    }
    console.log("balance",this.state.balances)

    return (
      <PrimaryLayout
        extraLinks={
          <>
            {this.state.balances && this.state.balances.map((c) => {
              return <span className="balance-preview">
                <span className={"currency-flag currency-flag-" + c.key.toLowerCase()}></span>
                <span>{formatCurrency(c.amount, c.key)}</span>
                </span>
            })}
            <a className="header-link" onClick={() => this.onDepositClicked()}>
              <WalletOutlined /> Deposit
            </a>
          </>
        }
        pageIcon={<UserOutlined style={{ fontSize: "36px", color: "#08c" }} />}
        pageName={"Currency"}
        loading={this.props.loading}
      >
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={this.handleCancel}
          title={
            <span>
              <MoneyCollectTwoTone /> Deposit Money
            </span>
          }
        >
          {depositForm(this.state.currencies, this.depositMoney)}
        </Modal>
        <Row>
          <Col span={16}>
            <Row>
              {currencies &&
                currencies.map((currency) => {
                  return (
                    <Col key={currency.key} span={12}>
                      <CurrencyPanel
                        onCurrencyBuy={this.onCurrencyBuy}
                        key={currency.key}
                        currencyKey={currency.key}
                        rates={currency.rates}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col span={8}>
            {this.props.items && (
              <Basket
                clearBasket={() => {
                  this.props.basketClear();
                }}
                rates={rates}
                items={this.props.items}
              ></Basket>
            )}
          </Col>
        </Row>
      </PrimaryLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.isLoggedIn,
    loading: state.data.loading,
    items: state.basket.items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchCurrencies: fetchCurrencies,
      fetchBalances: fetchBalances,
      fetchAvailableCurrencies: fetchAvailableCurrencies,
      basketItemAdded: basketItemAdded,
      basketList: basketList,
      basketItemRemoved: basketItemRemoved,
      basketClear: basketClear,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPage);
