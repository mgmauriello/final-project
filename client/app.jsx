import React from 'react';
import Map from './map';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleCaptionChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('soundscape', this.fileInputRef.current.files[0]);
    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ title: '' });
        this.fileInputRef.current.value = null;
      })
      .catch(err => {
        console.error('error:', err);
      });
  }

  render() {
    return (
      <Map />
    );
  }
}
