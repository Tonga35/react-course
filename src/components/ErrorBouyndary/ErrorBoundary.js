import React, { Component } from "react";

//its a higher order component that should only be used when we know that the code might fail.
// to use it we can wrap any component we want into it.
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };
  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    } else {
      return this.props.children;
    }  
  }
};

export default ErrorBoundary;