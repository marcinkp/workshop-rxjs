import React from 'react';
import './App.css';
import Result from "./Result"
import * as caller from "./Caller"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.empty()
  }

  empty = () => {
    return {
      user: {},
      paypal: {},
      payu: {},
      creditcard: {},
      providers: {},
    }
  }
  handleClick = () => {
    this.setState(this.empty())

    caller.callServices()
        .subscribe(merged => this.setState(merged))
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-3 text-center">
              <strong>User Call</strong>
            </div>
            <div className="col-sm-3 text-center" >
              <strong>Pay Pal</strong>
            </div>
            <div className="col-sm-3 text-center" >
              <strong>PayU</strong>
            </div>
            <div className="col-sm-3 text-center">
              <strong>Credit Card</strong>
            </div>
          </div>
          <div className="row">
            <Result className="col-sm-3" value={this.state.user}/>
            <Result className="col-sm-3" value={this.state.paypal}/>
            <Result className="col-sm-3" value={this.state.payu}/>
            <Result className="col-sm-3" value={this.state.creditcard}/>
          </div>
          <div className="row">
            <Result className="col-sm-12" value={this.state.providers}/>
          </div>

          <div className="row">
            <div className="col-sm-12">
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.handleClick}>
              Execute
            </button>
            </div>
          </div>
        </div>
    );
  }
}