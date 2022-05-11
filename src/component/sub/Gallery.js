import React , { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../common/Layout';

function Gallery() {

  const [items, setItems] = useState([]);
  const [isPop, setIspop] = useState(false);
  const [index, setIndex] = useState(0);
  const key = '2ded31f6bd2818a5bdf20954d95106f2';
  const method = 'flickr.interestingness.getList';
  const per_page = 10;
  const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${key}&format=json&nojsoncallback=1&per_page=${per_page}`;

  useEffect(()=> {

    axios
    .get(url)
    .then((json)=> {
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    })
    .catch((err)=> {
        console.log(err)
    })
  },[]);

  useEffect(()=> {
    console.log(index)
  },[index])

  return (
    <>
      <Layout name='Gallery'>
          <ul>
            {items.map((item, idx)=> {
              return (
                <li key={idx} 
                    onClick={()=> {
                      setIspop(!isPop)
                      setIndex(idx)
                    }
                }>
                  <h2>{item.title}</h2>
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                </li>
              )
            })}
            <li></li>
          </ul>
      </Layout>

      { isPop ? <Popup/> : null }
    </>
  );

  function Popup() {
    useEffect(()=> {
      document.body.style.overflow = 'hidden';
      return () => (document.body.style.overflow = 'auto')
    })

    return (
      <aside className='popup'>
        <span onClick={()=> {
          setIspop(!isPop)
        }}>close</span>
        
        <div className='pic'>
          <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
          <p>{items[index].title}</p>
        </div>
      </aside>
    )
  }
}

export default Gallery