import React , { useEffect, useRef, useState} from 'react';
import axios from 'axios';


function Youtube() {
  const frame = useRef(null);
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);

  const api = 'AIzaSyA4JSBOYOot3CbalOVi-yn74v4FMmNPmsc';
  const list = 'PLC9z-XDyK2RgktTbTXl8MjyTEdzTAFIT4';
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api}&playlistId=${list}&maxResult=3&part=snippet`;

 
  useEffect(()=> {
    frame.current.classList.add('on');
    axios
    .get(url)
    .then((json) => {
      console.log(json.data.items);
      setItems(json.data.items)
    })
  },[]);

  return (
    // 두개 이상일때 프래그먼트
    <>
    <section className='youtube' ref={frame}>
      <div className='inner'>
        <h1>Youtube</h1>
        {items.map((item, idx) => {
          let desc = item.snippet.description;
          let desc_len = desc.length;
          let date = item.snippet.publishedAt;

          return (
            <article 
              key={idx}
              onClick={()=> {
                setIsPop(!isPop)
                // 해당 유투브를 출력하기 위한 index값
                setIndex(idx)
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
      </div>
    </section>

    {isPop ? <Popup/> : null}
    </>
  );
  
  function Popup() {
    // 팝업띄워지면 도큐먼트 fix
    useEffect(()=> {
      document.body.overflow = 'hidden';

      return () => {
        document.body.overflow = 'auto';
      }
    },[]);
  
    return (
      <aside className='popup'>
        <span onClick={()=> setIsPop(!isPop)}>close</span>
        <iframe src={
          'https://www.youtube.com/embed/' +
          items[index].snippet.resourceId.videoId
        }
        frameBorder='0'></iframe>
      </aside>
    )
  }
}

export default Youtube;
