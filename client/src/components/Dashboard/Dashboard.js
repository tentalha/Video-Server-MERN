import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';


const Dashboard = () => {
  const [redirect, setRedirect] = useState(false);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    let shouldRedirect = false;
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }
    setRedirect(shouldRedirect);

    if (!shouldRedirect && localStorage.getItem('userTokenTime')) {
      axios.get('http://localhost:3333/api/videoList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        setVideoList(res.data);
      });
    }
  }, []); // passing an empty array makes the useEffect only run on mount

  const deleteVideo = (id) => {

    axios.delete(`http://localhost:3333/api/videoList/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(data => setVideoList(prevState => prevState.filter(item => item._id !== id))).catch(err => console.log(err));

  }

  if (redirect) return <Redirect to="/signIn" />

  const videos = videoList.map(video => {
    return (
      <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4 my-4" key={video._id}>
        <Link to={'/video/' + video.upload_title}>
          <div className="video-thumbnail">
            <img src={video.thumbnail_path} alt="video thubmnail" />
          </div>
        </Link>
        <span className="username">
          <Link to={'/api/videos/' + video.upload_title}>
            {video.uploader_name}
          </Link>
        </span>
        <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
        <span className="delete" onClick={() => deleteVideo(video._id)}><AiFillDelete size={30} color='red' /></span>
      </div>
    );
  });

  return (
    <React.Fragment>
      <Navbar />
      <div className="container mt-5">
        <h4>Videos</h4>
        <hr className="my-4" />

        <div className="streams row">
          {videos}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
