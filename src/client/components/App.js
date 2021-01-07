import React, { Component } from 'react'
import axios from 'axios'

import upload_img from '../images/upload.png'
import upload_ok from '../images/upload_ok.png'

class App extends Component {
  state = {
    error: null,
    loading: false,
    successResponse: '',
    selectedFile: null
  }
  
  //Submitting the form
  handleSubmit = async (e) => {
    e.preventDefault()

    this.setState({ loading: true, successResponse: '', error: null })

    const data = new FormData() 
    data.append('csv_file', this.state.selectedFile)

    const res_data = await axios.post("/api/product", data)
    .then(response => response.data)
    
    this.handleResponse(res_data)
  }

  //Server response
  handleResponse = async (res_data) => {
    if(res_data['error']){
      return this.setState({ error: res_data['error'], loading: false })

    }else{
      //Success shows a message and reset the state to prevent resumitting
      document.getElementById("uploadFileField").value = ""
      return this.setState({ successResponse: res_data['data'], loading: false, selectedFile: null })
    }
  }

  //Change the file field
  onChangeHandler = (event) =>{
    if(event.target.files[0].size > 20000){
      return this.setState({ error: "Your file seems to be very large, try to upload a ligher one. Up to 20MB is allowed" })
    }

    this.setState({
      error: null,
      selectedFile: event.target.files[0],
    })
  }
  
  render() {
    return (
      <div className="App">
        <h1>Import your products from CSV</h1>
        
        {this.state.error && <div className="msg_error">{this.state.error}</div>}
        {this.state.loading && <div  className="msg_loading">Submitting... </div>}
        {this.state.successResponse && !this.state.error && <div className="msg_success">{this.state.successResponse}</div>}

        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div className="submit_area" onClick={() => document.getElementById("uploadFile").click()}>
            <h3>{this.state.selectedFile ? this.state.selectedFile.name : "Choose your file..."}</h3>

            <label className="file_label" id="uploadFile">
              <input type="file" name="csv_file" id="uploadFileField" onChange={this.onChangeHandler} />
            </label>

            <div className="image_area">
              {this.state.selectedFile ? <img src={upload_ok} /> : <img src={upload_img} />}
            </div>
          </div>

          <div className="area_button">
            {!this.state.loading && <button type="submit" className="submit_button">Submit file</button>}
          </div>
        </form>
      </div>
    )
  }
}

export default App