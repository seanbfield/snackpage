import React, { Component } from 'react'
import { storage } from '../../firebase'
import { getBase64 } from 'base64js-es6'
import loading from '../../assets/loading.gif'

export default class ImgUpload extends Component {
  // Image Upload
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      visible: true
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('url') && this.setState({
      text: JSON.parse(localStorage.getItem('url')),
      url: this.state.url
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('url', JSON.stringify(nextState.url))
    localStorage.setItem('url', Date.now())

  }


  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      getBase64(this.state.image).then(base64 => {
        localStorage["fileBase64"] = base64;
        console.debug("file stored", base64);
      });
      this.setState(() => ({ image }));
    }
  }
  handleUpload = (e) => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ url });
        })
      });
  }
  render() {

    if (this.state.progress === 0) {
      return (
        <>
          <div className="upload-image-box">
            <div className="header">
              <input className="choose-button" type="file" onChange={this.handleChange} />
              <button className="upload-button" disabled={!this.state.image} onClick={this.handleUpload}>Upload</button>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <img className="responsive" src={this.state.url || loading} alt="Uploaded images" />
        </>
      )
    }
  }
}