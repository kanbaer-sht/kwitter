import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbConf';
import Kweet from 'components/Kweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [kweet, setKweet]     = useState("");
    const [kweets, setKweets]   = useState([]);
    const [fileAttachment, setFileAttachment] = useState(null);

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
        let fileAttachmentUrl = "";
        if(fileAttachment !== "") {
            const fileAttachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileAttachmentRef.putString(fileAttachment, "data_url");
            fileAttachmentUrl = await response.ref.getDownloadURL();
        }
        const kweetObj = {
            text:kweet,
            creatorId: userObj.uid,
            createdAt: Date.now(),
            fileAttachmentUrl
        }
        await dbService.collection("kweets").add(kweetObj);
        setKweet("");
        setFileAttachment(null);
    }

    const onChange = (e) => {
        setKweet(e.target.value);
    }

    const onFileChange = (e) => {
        const theFile = e.target.files[0];
        console.log(theFile);
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const result = finishedEvent.currentTarget.result;
            setFileAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onRemovePhotoClick = () => {
        setFileAttachment(null);
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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Kweet" />
                {fileAttachment && (
                    <div>
                        <img src={fileAttachment} width="50px" height="50px" alt=""/>
                        <button onClick={onRemovePhotoClick}>사진 제거</button>
                    </div>
                )}
            </form>
            <div>
                {kweets.map((kweet) => ( 
                    <Kweet 
                    key={kweet.id}
                    kweetObj={kweet}
                    isOwner={kweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default Home;