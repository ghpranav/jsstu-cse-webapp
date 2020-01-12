import React, { Component } from "react";
import "../awards/form.css"
import moment from "moment";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

export default class Card extends Component {
  constructor(props) {
    super(props);
    const { title, date } = this.props.card;
    this.state = {
      title: title,
      date: date,
      user: this.props.user._id,
      isediting: false
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  componentDidMount() {

  }

  edittraining = () => {
    this.setState({ isediting: !this.state.isediting });
  };

  printApiHandler = id => {
    console.log("print");
  };

  mySubmitHandler = event => {
    event.preventDefault();
    this.props.trainingEdit(this.state, this.props.card._id);
    this.edittraining();
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    console.log(this.state, this.props);
  };

  editing = () => {
    return (<div className="container">
      <div className="row">
        <div className="col-md-8 wow slideInLeft mt m-auto">
          <div className="card mt-2">
            <div className="card-body">
              <form className="dashboard-form" onSubmit={this.mySubmitHandler}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={this.state.title} placeholder="Enter Training Title" id="title" onChange={this.myChangeHandler} required></input>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" value={moment(this.state.date).format("YYYY-MM-DD")} id="date" onChange={this.myChangeHandler} required></input>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-success">submit</button>
                  <button onClick={this.edittraining} className="btn btn-warning">cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  notEditing = () => {
    const { _id, title, date } = this.props.card;
    const { removeCard } = this.props;
    // console.log(this.props.user, this.props.card)

    const docStyles = StyleSheet.create({
      page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4"
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      }
    });

    // Create Document Component
    const PubDoc = () => (
      <Document>
        <Page size="A4" style={docStyles.page}>
          <View style={docStyles.section}>
            <Text> Title: {title}</Text>
            <Text> Date: {moment(date).format("Do MMM YYYY")}</Text>
          </View>
        </Page>
      </Document>
    );

    return (
      <section className="container mt-4">
        <div className="row">
          <div className="col-md-12 wow slideInLeft">
            <div className="card">
              <div className="card-body">
                <h5 className="text-center dashboard-title">{title}</h5>
                <p className="text-center text-muted">
                  {moment(date).format("Do MMM YYYY")}
                </p>
                <div className="mt-4 text-center">
                  <button
                    href="#2"
                    className="btn btn-outline-warning"
                    onClick={() => this.printApiHandler(_id)}
                  >
                    <i className="fas fa-print"></i>&emsp;
                    <PDFDownloadLink
                      document={PubDoc()}
                      fileName="trainings.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading pdf" : "Print PDF"
                      }
                    </PDFDownloadLink>
                    &emsp;
                  </button>
                  <button
                    href="#1"
                    className="btn btn-outline-info"
                    onClick={() => this.edittraining(_id)}
                  >
                    <i className="fa fa-pencil"></i>&emsp;Edit&emsp;
                  </button>
                  <button
                    href="#3"
                    className="btn btn-outline-danger"
                    onClick={() => removeCard(_id)}
                  >
                    <i className="fa fa-trash"></i>&emsp;Delete&emsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  render() {
    return this.state.isediting ? this.editing() : this.notEditing();
  }
}
