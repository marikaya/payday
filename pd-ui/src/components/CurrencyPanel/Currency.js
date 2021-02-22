import "./Currency.less";
import React, { useRef, useState } from "react";
import { formatCurrency, getCurrency } from "country-currency-map";
import Icon, { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Table, Form } from "antd";

const currencyBuyPanel = ({
  currencyKey,
  baseCurrencyKey,
  rate,
  onCurrencyBuy,
}) => {
  const [cost, setCost] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <h2>
        <span
          className={"currency-flag currency-flag-" + currencyKey.toLowerCase()}
        />
        {currencyKey}
      </h2>
      <span>
        <b>Cost</b> : {cost} {baseCurrencyKey}
      </span>
      <hr></hr>
      <Form
        form={form}
        onFinish={(e) => {
        
          onCurrencyBuy(currencyKey, baseCurrencyKey, Number(e.amount));
          form.resetFields();
        }}
      >
        <Form.Item
          onChange={(e) => {
            setCost(e.target.value / rate);
          }}
          name="amount"
          label={"Amount"}
        >
          <Input type="number" />
        </Form.Item>

        {buttonStatus && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Buy
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

const CurrencyPanel = ({ currencyKey, rates, onCurrencyBuy }) => {
  const buttonRef = useRef();
  let text = getCurrency(currencyKey) || { name: "Unkown" };

  const dataSource = [];
  for (let c of Object.keys(rates)) {
    dataSource.push({
      baseCurrency: currencyKey,
      targetCurrency: c,
      value: rates[c],
      key: c,
    });
  }

  const columns = [
    {
      title: "Base Currency",
      dataIndex: "baseCurrency",
      key: "baseCurrency",
      render: (t, r) => {
        return (
          <>
            <span
              className={
                "currency-flag currency-flag-" + r.baseCurrency.toLowerCase()
              }
            />
            {" " + r.baseCurrency}
          </>
        );
      },
    },
    {
      title: "Target Currency",
      dataIndex: "targetCurrency",
      key: "targetCurrency",
      render: (t, r) => {
        return (
          <>
            <span
              className={
                "currency-flag currency-flag-" + r.targetCurrency.toLowerCase()
              }
            />
            {" " + r.targetCurrency}
          </>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (d) => {
        return <>{d.toFixed(2)}</>;
      },
    },
    {
      title: "Action",
      render: (r, d, e) => {
        return (
          <Popover
            placement={"right"}
            content={currencyBuyPanel({
              currencyKey: r.targetCurrency,
              baseCurrencyKey: r.baseCurrency,
              rate: r.value,
              onCurrencyBuy: onCurrencyBuy,
            })}
          >
            <Button className={"currency-buy-button"}>
              <PlusOutlined />
            </Button>
          </Popover>
        );
      },
    },
  ];

  return (
    <div className={"currency-panel"}>
      <h2 className={"currency-header"}>
        <span>{text.name}</span>
      </h2>

      <div className="currency-rates">
        <Table size={"small"} dataSource={dataSource} columns={columns}></Table>
      </div>
    </div>
  );
};

export default CurrencyPanel;
