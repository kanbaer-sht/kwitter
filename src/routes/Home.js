import React, { useEffect, useState } from 'react';
import { dbService } from 'fbConf';

const Home = ({ userObj }) => {
    const [kweet, setKweet]     = useState("");
    const [kweets, setKweets]   = useState([]);
    
    useEffect(() => {
        dbService.collection("kweets").onSnapshot((snapshot) =>{
            const kweetArr = snapshot.docs.reverse().map((doc) => ({
                id:doc.id,
                ...doc.data()
            }));
            setKweets(kweetArr);
            console.log(kweetArr);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("kweets").add({
            text:kweet,
            creatorId: userObj.uid,
            createdAt: Date.now()
        });
        setKweet("");
    }

    const onChange = (e) => {
        setKweet(e.target.value);
    }
    
    return (
        <>
        <div>
            <form onSubmit={onSubmit}>
                <input 
                value={kweet}
                onChange={onChange}
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
                />
                <input 
                type="submit" 
                value="Kweet" 
                />
            </form>
            <div>
                {kweets.map((kweet) => (
                <div key={kweet.id}>
                    <h4>{kweet.text}</h4>
                </div>))}
            </div>
        </div>
        </>
    );
}

export default Home;