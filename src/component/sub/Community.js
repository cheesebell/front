import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Community() {
    const input = useRef(null);
    const textarea = useRef(null);
    const dummyPosts = [
        { title: 'Hello2', content: 'Here comes description in detail.'},
        { title: 'Hello2', content: 'Here comes description in detail.'},
    ]
    const [ posts, setPosts ] = useState(dummyPosts);

    const resetPosts = () => {
        input.current.value='';
        textarea.current.value='';
    };

    const createPosts = () => {
        setPosts([
            {title: input.current.value, content: textarea.current.value},
            ...posts
        ])
    }

    return (
        <Layout name={'Community'}>
            <div className='inputBox'>
                <input 
                    type='text' 
                    placeholder='제목을 입력하세요'
                    ref={input} 
                /><br/>
                <textarea
                    cols='30' 
                    rows='10' 
                    placeholder='본문을 입력하세요' 
                    ref={textarea}
                /><br/>
                <button onClick={resetPosts}>cancel</button>
                <button onClick={createPosts}>create</button>
            </div>
            
            <div className='showbox'>
                {posts.map((posts,idx) => {
                    return (
                        <article key={idx}>
                            <h2>{posts.title}</h2>
                            <p>{posts.content}</p>
                        </article>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Community;