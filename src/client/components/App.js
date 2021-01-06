import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    error: null,
    loading: false,
    successResponse: '',
    selectedFile: null
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true })

    const data = new FormData() 
    data.append('csv_file', this.state.selectedFile)

    const res_data = await axios.post("/api/product", data)
    .then(response => response.data)
    
    this.handleResponse(res_data)
  };

  //Server response
  handleResponse = async (res_data) => {
    if(res_data['error']){
      return this.setState({ error: res_data['error'], loading: false });

    }else{
      return this.setState({ successResponse: res_data['data'], loading: false });
    }
  }

  onChangeHandler=event=>{

    if(event.target.files[0].size > 20000){
      return this.setState({ error: "Your file seems to be very large, try to upload a ligher one. Up to 20MB is allowed." });
    }

    console.log(event.target.files[0])
      this.setState({
        error: null,
        selectedFile: event.target.files[0],
      })
  }

  
  render() {
    return (
      <div className="App">
        <h1>Import your company products from CSV</h1>
        
        {this.state.error && <div>ERROR: {this.state.error}</div>}

        {this.state.loading && <div>Loading</div>}

        {this.state.successResponse && <div>{this.state.successResponse}</div>}

        <form onSubmit={this.handleSubmit}>
          <input type="file" name="csv_file" onChange={this.onChangeHandler}/>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;