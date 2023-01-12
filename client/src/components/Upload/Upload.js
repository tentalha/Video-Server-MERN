import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Progress } from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import './Upload.css';

const Upload = () => {

  const [loaded, setLoaded] = useState(0);
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [otherDetails, setOtherDetails] = useState({ title: '', description: '' })

  const maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      toast.error('Maximum 1 file is allowed');
      event.target.value = null;
      return false;
    } else {
      let err = '';
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) { // 50 MB
          err += files[i].name + ', ';
        }
      }
      if (err !== '') {
        event.target.value = null;
        toast.error(err + " is/are too large. Please select file size < 50Mb");
      }
    }
    return true;
  }

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    if (maxSelectFile(event)) {
      setSelectedVideos(files);
      setLoaded(0);
    }
  }

  const handleOtherChange = (e) => {
    setOtherDetails({
      ...otherDetails,
      [e.target.name]: e.target.value
    })
  }


  const fileUploadHandler = async () => {
    console.log(otherDetails);
    const data = new FormData();
    for (let i = 0; i < selectedVideos.length; i++) {
      data.append('file', selectedVideos[i]);
    }
    data.append('title', otherDetails.title)
    data.append('description', otherDetails.description)
    console.log(data)
    try {
      const upload = await axios.post('http://localhost:3333/api/upload', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }, {
        onUploadProgress: ProgressEvent => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
        }
      });
      console.log(upload);
      toast.success('Upload Successful');
    } catch (err) {
      toast.error(`Upload Fail with status: ${err.statusText}`);
    }
  }

  if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="form-group">
          <ToastContainer />
        </div>
        <h4>Upload Video</h4>
        <hr className="my-4" />

        <form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
          {/* <div className='form-group'>
            <input
              id="last-name"
              className="form-control"
              type="text"
              name="title"
              value={otherDetails?.title}
              onChange={handleOtherChange}
              placeholder="Title"
              required />
          </div>
          <div className='form-group'>
            <input
              id="last-name"
              className="form-control"
              type="textarea"
              name="description"
              value={otherDetails?.description}
              onChange={handleOtherChange}
              placeholder="Description"
              required />
          </div> */}
          <div className="form-group files">
            <label>Upload Your Videos Here</label>
            <input
              type="file"
              name="file"
              className="form-control"
              multiple="multiple"
              accept="video/*"
              onChange={fileChangeHandler} />
            <Progress max="100" color="success" value={loaded} className="mt-4 mb-1">
              {isNaN(Math.round(loaded, 2)) ? 0 : Math.round(loaded, 2)}%
            </Progress>
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={fileUploadHandler}>Upload Video
            </button>
          </div>
        </form>
      </div >
    </>
  );
}

export default Upload;
