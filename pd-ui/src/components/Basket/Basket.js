import { Button, Table } from "antd";
import React from "react";
import "./Basket.less";
import {formatCurrency} from "country-currency-map"

const columns = [
  {
    title: "Base Currency",
    dataIndex: "baseCurrency",
    key: "baseCurrency",
    render: function (text, r) {
      return <><span
      className={
        "currency-flag currency-flag-" + r.baseCurrency.toLowerCase()
      }
    />{" " + text}</>;
    },
  },
  {
    title: "Target Currency",
    dataIndex: "targetCurrency",
    key: "targetCurrency",
    render: function (text, r) {
      return <><span
      className={
        "currency-flag currency-flag-" + r.targetCurrency.toLowerCase()
      }
    />{" " + text}</>;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: function (text, record) {
      return <>{text}</>;
    },
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    render: function (text, record) {
      return <> {formatCurrency(text,record.baseCurrency)}</>;
    },
  },
];


const Basket = ({ items, rates, clearBasket }) => {
  const dataSource = [];

  for (let c in items){
    let obj = items[c];
    dataSource.push({
      baseCurrency: obj.baseCurrency,
      targetCurrency: obj.targetCurrency,
      amount: obj.value.toFixed(2),
      key: c,
      cost:  (obj.value / rates[obj.baseCurrency][obj.targetCurrency] ).toFixed(2)
    })
  }

  return (
    <div className="basket-panel">
      <div className="basket-header">
        <h2 className={"basket-header-text"}>Basket</h2>{" "}
        <Button onClick={clearBasket} type="link" className={"basket-clear"}>Clear </Button>
      </div>
      <Table
        pagination={true}
        columns={columns}
        dataSource={dataSource}
      ></Table>
    </div>
  );
};

export default Basket;
