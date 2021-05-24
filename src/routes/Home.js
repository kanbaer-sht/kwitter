import React, { useEffect, useState } from 'react';
import { dbService } from 'fbConf';

const Home = () => {
    const [kweet, setKweet]     = useState("");
    const [kweets, setKweets]   = useState([]);

    const getKweets = async () => {
        const dbKweets = await dbService.collection("kweet").get();
        dbKweets.forEach((document) => {
            const kweetObject = {
                ...document.data(),
                id: document.id,
                
            }
            setKweets((prev) => [kweetObject, ...prev]);
        });
    }

    useEffect(() => {
        getKweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("kweet").add({
            kweet,
            createdAt: Date.now()
        });
        setKweet("");
    }

    const onChange = (e) => {
        setKweet(e.target.value);
    }
    console.log(kweets);
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
                    <h4>{kweet.kweet}</h4>
                </div>))}
            </div>
        </div>
        </>
    );
}

export default Home;