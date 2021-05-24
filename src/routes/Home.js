import React, { useState } from 'react';
import { dbService } from '../fbConf';

const Home = () => {
    const [kweet, setKweet] = useState("");

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
        </div>
        </>
    );
}

export default Home;