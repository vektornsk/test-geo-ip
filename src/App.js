import React, { Component } from 'react';
import ResultList from './ResultList';
import './App.css';

class App extends Component {
  state = {
    inputValue: '',
    inputError: false,
    submit: true,
    result: []
  }

  changeInput = (event) => {
    let value = event.target.value;

    this.setState({
        inputError: false,
        inputValue: value
      });

    localStorage.setItem('inputValue', value);
  }

  pressEnter = (event) => {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  submit = () => {
    if(this.state.submit) {
      this.setState({submit: false});
      fetch('https://api.2ip.ua/geo.json?ip=' + this.state.inputValue)
        .then((response)=>{
          if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText));
          }
          return Promise.resolve(response);
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonObject) => {
          let resultObject = {
            ipRequest: this.state.inputValue,
            data: jsonObject 
          }
          
          this.setState(prevState => ({
            submit: true,
            inputValue: '',
            result: [ JSON.stringify(resultObject), ...prevState.result]
          }));

          localStorage.setItem('inputValue', '');
          localStorage.setItem('listRequest', this.state.result.join(';'));
      
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            submit: true,
            inputError: true
          });
        });
    }
  }

  componentDidMount() {
    let listRequest = localStorage.getItem('listRequest');
    let inputValue = localStorage.getItem('inputValue');

    if(listRequest) {
      this.setState({
        result: listRequest.split(';')
      });
    }

    if(inputValue) {
      this.setState({
        inputValue
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="form">
          <input className={this.state.inputError ? 'input error' : 'input'} onKeyPress={this.pressEnter} onChange={this.changeInput} type="text" value={this.state.inputValue}/>
          <button className="button" onClick={this.submit}>Проверить</button>
        </div>
        {this.state.result.length > 0 && <ResultList list={this.state.result} />} 
      </div>
    );
  }
}

export default App;
