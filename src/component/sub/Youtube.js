 import React , { useState, useRef } from 'react';
import { useSelector} from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';


function Youtube() {
  // store에 youtubeReducer데이터를 가져옴 (반배열)
  const vidData = useSelector((store) => store.youtubeReducer.youtube);
  const pop = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    // 두개 이상일때 프래그먼트
    <>
    <Layout name='Youtube'>
        {vidData.map((item, idx) => {
          let desc = item.snippet.description;
          let desc_len = desc.length;
          let date = item.snippet.publishedAt;

          return (
            <article 
              key={idx}
              onClick={()=> {
                // 해당 유투브를 출력하기 위한 index값
                setIndex(idx);
                pop.current.open();
              }}
            >
              <div className='inner'>
                <div className='pic'>
                  <img src={item.snippet.thumbnails.medium.url}/>
                </div>
                <h2>{item.snippet.title}</h2>
                {/* desc 글자 수가 200자면? 0부터 200자 이상은 ....으로 200이하면 desc 보여줌 */}
                <p>{desc_len > 100 ? desc.substr(0, 100) + '...' : desc}</p>
                <span>{date.split('T')[0]}</span>
              </div>
            </article>
          )
        })}
    </Layout>
      {/* useRef로 컴포넌트를 참조 가능 (자식컴포넌트로 forwardRef로 전달할 경우) */}
      <Popup ref={pop}> 
        { vidData.length !== 0 && (
          <iframe src={
            'https://www.youtube.com/embed/' +
            vidData[index].snippet.resourceId.videoId
          } frameBorder='0'></iframe>
        )}
        <span onClick={() => pop.current.close()}>close</span>
      </Popup>
    </>
  );
}

export default Youtube;
