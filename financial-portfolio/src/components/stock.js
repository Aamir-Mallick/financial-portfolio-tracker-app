import React from "react";
import axios from "axios";
import * as firebase from "firebase";
import "./firebase";
import "./stockStyle.css";
import Model from "../model/Modelpopup.js";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    //this is my state
    this.state = {
      arr: [],
      userModel: {
        buttonOne: false,
        buttonTwo: false,
        buttonThree: false,
        buttonFour: false,
        buttonFive: false
      }
    };
  }
  componentDidMount() {
    this.setState({
      arr: this.state.arr
    });
  }

  // conditional rendering for pop-up the model for different click of add stocks button
  clickButtonFirst = val => {
    this.setState(prevState => {
      return {
        ...prevState,
        userModel: {
          ...prevState.userModel,
          [val]: !prevState.userModel[val]
        }
      };
    });
  };

  showValue = id => {
    let arr2 = [];
    firebase
      .database()
      .ref("/data/" + id)
      .once("value")
      .then(snapShot => {
        arr2.push(snapShot.val());
        console.log(arr2);
        this.setState({
          arr: this.state.arr.concat(arr2)
        });
      });
  };

  deleteStock = myId => {
    this.setState(prevState => {
      return {
        ...prevState,
        arr: prevState.arr.splice(1, myId)
      };
    });
  };

  render() {
    return (
      <>
        {console.log(this.state)}

        <div className="MyStocks">
          <h2>Financial Portfolio Tracker</h2>
          <table className="MyStocksTable">
            <thead>
              <tr className="MyStocksTable">
                <th>Stock symbol</th>
                <th>Stock name</th>
                <th>No.of shares</th>
                <th>Buy price</th>
                <th>Current price</th>
                <th>Profit/Loss</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.arr.map((x, index) => {
                console.log(index);
                return (
                  <tr key={index}>
                    <td>{x.symbol}</td>
                    <td>{x.name}</td>
                    <td>{x.noOfShares}</td>
                    <td>{x.buyPrice}</td>
                    <td>{x.currentPrice}</td>
                    <td>{x.buyPrice - x.currentPrice}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.deleteStock(index);
                        }}
                      >
                        stop tracking
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="AddStocksTitle">
          <button
            className="StockButton"
            onClick={() => {
              this.clickButtonFirst("buttonOne");
            }}
          >
            INTC
          </button>
          Intel Corporation
          <button
            className="StockButton"
            onClick={() => {
              this.clickButtonFirst("buttonTwo");
            }}
          >
            BA
          </button>
          The Boeing Comapny <br />
          <button
            className="StockButton"
            onClick={() => {
              this.clickButtonFirst("buttonThree");
            }}
          >
            MSFT
          </button>
          Microsoft Corporation
          <button
            className="StockButton"
            onClick={() => {
              this.clickButtonFirst("buttonFour");
            }}
          >
            MCD
          </button>
          McDonald's Corporation <br />
          <button
            className="StockButton"
            onClick={() => {
              this.clickButtonFirst("buttonFive");
            }}
          >
            DIS
          </button>
          The Walt Disney Corporation
        </div>

        {this.state.userModel.buttonOne ? (
          <Model
            endPoint="INTC"
            name="Intel Corporation"
            collection="0"
            closeOne={() => {
              this.clickButtonFirst("buttonOne");
            }}
            addval={this.showValue}
          />
        ) : null}
        {this.state.userModel.buttonTwo ? (
          <Model
            endPoint="BA"
            name="The Boeing Company"
            collection="1"
            closeOne={() => {
              this.clickButtonFirst("buttonTwo");
            }}
            addval={this.showValue}
          />
        ) : null}
        {this.state.userModel.buttonThree ? (
          <Model
            endPoint="MSFT"
            name="Microsoft Corporation"
            collection="2"
            closeOne={() => {
              this.clickButtonFirst("buttonThree");
            }}
            addval={this.showValue}
          />
        ) : null}
        {this.state.userModel.buttonFour ? (
          <Model
            endPoint="MCD"
            name="McDonals's Corporation"
            collection="3"
            closeOne={() => {
              this.clickButtonFirst("buttonFour");
            }}
            addval={this.showValue}
          />
        ) : null}
        {this.state.userModel.buttonFive ? (
          <Model
            endPoint="DIS"
            name="The Walt Disney Corporation"
            collection="4"
            closeOne={() => {
              this.clickButtonFirst("buttonFive");
            }}
            addval={this.showValue}
          />
        ) : null}
      </>
    );
  }
}

export default Stock;
