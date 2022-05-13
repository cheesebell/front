import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Community() {
    const input = useRef(null);
    const textarea = useRef(null);
    const editInput = useRef(null); // 수정처리 선언
    const editTextarea = useRef(null);
    // 순서04. 메인 컴포넌트에서 로컬저장소에 저장된 데이터를 다시 state에 옮겨담음
    let data = localStorage.getItem('posts');
    data = JSON.parse(data);

    const [ posts, setPosts ] = useState(data);
    const [ allowed, setAllowed ] = useState(true); // 중복수정 막을 state


    // 초기화 핸들
    const resetPosts = () => {
        input.current.value='';
        textarea.current.value='';
    };

    // 생성
    const createPosts = () => {
        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();
        resetPosts();

        if( !inputVal || !textareaVal ) {
            alert ('제목과 본문을 모두 입력하세요');
            return;
        }
        setPosts([
            {title: inputVal, content: textareaVal},
            ...posts
        ])
    }

    // 삭제
    // 삭제할 순번과 반복도 순번이 같으면 해당 값을 반환
    const deletePosts = (idx) => {
        setPosts (posts.filter((_, index) => index !== idx));
    };

    // 수정
    const enableUpdate = (index) => {
        // 수정모드일때 다른 수정버튼 비활성화
        setAllowed(false);

        setPosts (
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = true;
                return post;
            })
        )
    };

    // 취소
    const disableUpdate = (index) => {
        // 수정버튼 활성화
        setAllowed(true);

        setPosts (
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        );
    };

    // 수정출력
    const updatePost = (index) => {

        // 내용 없으면 경고창
        if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
            alert('수정할 제목과 본문을 입력하세요.');
            return;
        };

        setAllowed(true);

        setPosts (
            posts.map((post, idx) => {
                if (idx === index ) {
                    post.title = editInput.current.value;
                    post.content = editTextarea.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        )
    }

    // 순서05. 해당 컴포넌트에서 CRUD로 데이터 변경이 일어날때마다 로컬저장소에 저장
    useEffect(()=> {
        localStorage.setItem('posts', JSON.stringify(posts));
    },[posts])

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
                {posts.map((post,idx) => {
                    // 순서06. 변경된 데이터로 다시 리스트 출력
                    return (
                        <article key={idx}>
                            {post.enableUpdate ? (
                                <>
                                <input 
                                    type='text' 
                                    defaultValue={post.title} 
                                    ref={editInput}
                                /><br/>
                                <textarea 
                                    defaultValue={post.content}
                                    ref={editTextarea}
                                /><br/>
                                <button onClick={() => disableUpdate(idx)}>취소</button>
                                <button onClick={() => updatePost(idx)}>저장</button>
                                </>
                            ):(
                                <>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <button 
                                    onClick={() => {
                                        // allowd 값이 true일떄만 수정 가능
                                        if(allowed) enableUpdate(idx)
                                    }}>
                                    수정
                                </button>
                                <button onClick={() => deletePosts(idx)}>삭제</button>
                                </>
                            )}
                        </article>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Community;