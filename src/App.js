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
            <Result className="col-sm-3" value={this.state.user}/>
            <Result className="col-sm-3" value={this.state.paypal}/>
            <Result className="col-sm-3" value={this.state.payu}/>
            <Result className="col-sm-3" value={this.state.creditcard}/>
          </div>
          <div className="row">
            <Result className="col-sm-12" value={this.state}/>
          </div>

          <div className="row">
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.handleClick}>
              Execute
            </button>
          </div>
        </div>
    );
  }
}