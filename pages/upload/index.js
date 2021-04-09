import React from 'react';
import axios from 'axios';

const onChange = async (file) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    const formData = new FormData();
    formData.append("theFile", file);
    const response = await axios.post('/api/fileUpload', formData, config)
      .then(success=>{
        console.log("upload succeeded")
        console.log(success)
      })
      .catch(error =>{
        console.log("upload failed")
        console.log(error)
      })


    // const response = await axios.post('https://doodoo.free.beeceptor.com', formData, config);
    // console.log('response', response.data);
  };

const onChangeHandler = (event) => {
  onChange(event.target.files[0]);
};

class Upload extends React.Component {
    render() {    
        return (
            <form>
                <input 
                    type='file'
                    multiple={false}
                    onChange={onChangeHandler}
                />
            </form>
        );
    }
 }


export default Upload;