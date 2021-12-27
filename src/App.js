
import './App.css';
import { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';

function App() {

  const [posts, setPosts] = useState([]);

useEffect(()=>{
  getPosts();
},[]);

  async function getPosts(){
    const res = await fetch('http://localhost:8000/api/books');
    const data = await res.json();
    setPosts(data);
    console.log(data);
  }

  return (
    <div className='App'>
      <CreatePostForm/>
      {posts.map((post, index) =>(
        <div key={index}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default App;


function CreatePostForm(){


  const [title, setTitle] = useState();

  function handleSubmit(e){
    e.preventDefault();

    fetch('http://localhost:8000/api/books',{
      method: 'POST',
      body: JSON.stringify({title}),
    });
  }


  return(
    <Form onSubmit={handleSubmit}>
      <input type="text" 
      name='title' 
      value={title} 
      onChange={(e)=>setTitle(e.target.value)}  />
    
    <button type='submit'>submit</button>
    </Form>
  )
}
