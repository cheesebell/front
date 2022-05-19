import React , { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

function Gallery() {
  const pop = useRef(null);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
                      pop.current.open();
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

      <Popup ref={pop}>
        {loading && (
          <>
          <div className='pic'>
            <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
          </div>
          <p>{items[index].title}</p>
          <span onClick={() => pop.current.close()}>close</span>
          </>
        )}
      </Popup> 
    </>
  );
}

export default Gallery;