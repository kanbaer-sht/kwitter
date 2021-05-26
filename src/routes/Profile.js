import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbConf';
import { useHistory } from 'react-router';

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState("");

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyKweets = async () => {
        await dbService.collection("kweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
    }

    useEffect(() => {
        getMyKweets();
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        if(newDisplayName !== userObj.displayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }
    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                onChange={onChange}
                type="text" 
                placeholder="Display Name" 
                value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>로그아웃</button>
        </>
    );
};

export default Profile;