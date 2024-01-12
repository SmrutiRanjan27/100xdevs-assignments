import { useEffect, useState } from 'react';
import "./App.css"
function App() {
  const [users, setUsers] = useState([]);
  const [social_media, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch("http://localhost:3000/profiles");
      const data = await response.json();
      setUsers(data["users"]);
      setSocialMedia(data["social_media"]);
    }
    fetch_data();
  }, [])

  return (
    <>
      {
        users.map(user => 
        <BusinessCard 
          key = {user["_id"]}
          name={user["name"]}
          about={user["about"]}
          interests={user["interests"]}
          social_medias={user["social_media"].map(id => social_media.find(item => id == item["_id"]))}
        />)
      }
    </>
  )
}

function BusinessCard({name, about, interests, social_medias}) {
  console.log(social_medias);
  return ( 
  <div className="card-container">
    <h1 className="name-container">{name}</h1>
    <p>{about}</p>

    <h3>Interests</h3>
    <ul>
    {interests.map((interest, i) => <li key={i}>{interest}</li>)}
    </ul>
    {
      social_medias.map((item, i) => <a key={i} href={item["link"]} target="_blank"><button className="social-media-button">{item["name"]}</button></a>)
    }
  </div>
  )
}

export default App
