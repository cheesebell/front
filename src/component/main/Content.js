import React, {useState, useEffect } from 'react'

function Content() {
  // 순서01. 메인페이지 접속시 로컬데이터가 없으므로 더미데이터를 state에 저장
  const getLocalDate = () => {

    const dummyPosts = [
        { title: 'Hello1', content: '뭐시당가.'},
        { title: 'Hello2', content: 'Here comes description in detail.'},
        { title: 'Hello3', content: 'Here comes description in detail.'},
        { title: 'Hello4', content: 'Here comes description in detail.'},
    ]

    const data = localStorage.getItem('posts');
    if (data) return JSON.parse(data);
    else return dummyPosts;
  }
  const [posts] = useState(getLocalDate);

  useEffect(()=> {
    // 저장된 state값을 로컬 저장소에 저장
    localStorage.setItem('posts', JSON.stringify(posts));
  },[posts])

  return (
    <main>
      {posts.map((post,idx) => {
        // 최신글 3개까지만 출력
        if(idx < 3) {
          return (
            <article key={idx}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          )
        }
      }
      )}
    </main>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  )
}

export default Content