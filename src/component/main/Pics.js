import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Pics(props) {
  const { flickr } = useSelector((store)=> store.flickrReducer);
  const [index, setIndex] = useState(0);
  const pop = useRef(null);

  const scrolled = props.scrolled;
  const start = props.start;
  const base = 400;
  const position = scrolled - start + base;

  return (
    <>
    <section id='pics' className='myScroll'>
			<h1 style={
        position >= 0 ? {transform: `translateX(${position * 1.5}px)`}
        : null
      }>Recent Gallery</h1>

      <h2 style={
        position >= 0 ? {transform: `translateX(${position * 1}px)`}
        : null
      }>Gallery</h2>
      {flickr.map((pic, idx) => {
        if (idx < 5) {
          <li
            key={idx}
            onClick={() => {
              setIndex(idx);
              pop.current.open();
            }}
          >
            <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_s.jpg`}/>
          </li>
        }
      })}
		</section>

    <Popup ref={pop}>
				{flickr.length !== 0 && (
					<>
						<img
							src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				)}
			</Popup>
    </>
  )
}

export default Pics;