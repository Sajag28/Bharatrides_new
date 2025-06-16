'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
formData.append('email', email);
formData.append('password', password);

    formData.append('title', title);
    formData.append('description', desc);
    formData.append('price', price);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/used-cars/upload-car/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('Car uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Upload Car</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required /><br />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
