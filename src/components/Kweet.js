import { dbService } from 'fbConf';
import React, { useState } from 'react';

const Kweet = ({ kweetObj, isOwner }) => {
    const [editing, setEditing]     = useState(false);
    const [newKweet, setNewkweet]   = useState(kweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 지우시겠습니까?");
        if (ok) {
            await dbService.doc(`kweets/${kweetObj.id}`).delete();
        }    
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`kweets/${kweetObj.id}`).update({
            text:newKweet,
        });
        setEditing(false);
    }

    const onChange = (e) => {
        setNewkweet(e.target.value);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input 
                        onChange={onChange}
                        type="text" 
                        placeholder="Edit your new Kweet" 
                        value={newKweet} 
                        required 
                        />
                        <input type="submit" value="Update Kweet" />
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
                    <h4>{kweetObj.text}</h4>
                    {isOwner && (
                        <>
                        <button onClick={onDeleteClick}>삭제</button>
                        <button onClick={toggleEditing}>수정</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Kweet;