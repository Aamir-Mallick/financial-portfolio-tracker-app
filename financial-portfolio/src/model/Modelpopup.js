import React from "react";
import axios from "axios";
import * as firebase from "firebase";
import "../components/firebase";
import "./modelStyle.css";

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      name: "",
      noShares: "",
      buyPrice: "",
      currentPrice: "",
      profitLoss: ""
    };
  }
  componentDidMount() {
    this.getDataFromApi(this.props.endPoint, this.props.collection);

    this.getDataFirebase(this.props.collection);
  }

  getDataFromApi(endpoint, userId) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${endpoint}&apikey=FKN7EAMLAZ78TT6S`;
    axios(url).then(res => {
      console.log(res);
      let dailyData = res.data["Time Series (Daily)"];
      console.log(dailyData);
      let latestData = Object.values(dailyData)[0];
      console.log(latestData["4. close"]);
      firebase
        .database()
        .ref("data")
        .child(userId)
        .update({
          currentPrice: latestData["4. close"]
        });
    });
  }

  getDataFirebase(userId) {
    firebase
      .database()
      .ref("/data/" + userId)
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());
        this.setState({
          symbol: snapshot.val().symbol,
          name: snapshot.val().name
        });
      });
  }

  onchangeHandlerA = (e, userId) => {
    firebase
      .database()
      .ref("data")
      .child(userId)
      .update({
        buyPrice: e.target.value
      });
    firebase
      .database()
      .ref("/data/" + userId)
      .once("value")
      .then(snapshot => {
        this.setState({
          buyPrice: snapshot.val().buyPrice
        });
      });
  };

  onchangeHandlerB = (e, userId) => {
    firebase
      .database()
      .ref("data")
      .child(userId)
      .update({
        noOfShares: e.target.value
      });
    firebase
      .database()
      .ref("/data/" + userId)
      .once("value")
      .then(snapshot => {
        this.setState({
          noShares: snapshot.val().noOfShares,
          profitLoss: this.state.buyPrice - this.state.currentPrice
        });
      });
  };

  render() {
    return (
      <div className="AddStockForm">
        <button id="crossbtn" onClick={this.props.closeOne}>
          &#10006;
        </button>
        <h3 id="heading">{this.state.name}</h3>
        <br />
        <span>company name</span>
        <span id="companyName">{this.state.name}</span>
        <br />
        <br />
        <span>No of Shares</span>
        <input
          type="text"
          onChange={e => this.onchangeHandlerA(e, this.props.collection)}
          placeholder="No. of shares"
          id="noShares"
        />
        <br />
        <br />
        <span>Buy Price</span>
        <input
          type="text"
          onChange={e => this.onchangeHandlerB(e, this.props.collection)}
          placeholder="buy price"
          id="buyPrice"
        />
        <br />
        <br />
        <span>Buy Data</span>
        <input type="Date" id="buyDate" />
        <br />
        <br />
        <button
          className="AddButton"
          onClick={() => {
            this.props.addval(this.props.collection);
          }}
        >
          add
        </button>
      </div>
    );
  }
}

export default Model;
