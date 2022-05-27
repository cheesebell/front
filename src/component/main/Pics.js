import { library } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';

function Pics() {
  const flickr = useSelector((store)=> store.flickrReducer.flickr);

  return (
    <section id='pics' className='myScroll'>
			<h1>Recent Gallery</h1>
      {flickr.map((pic, idx) => {
        if (idx < 5) {
          <li key={idx}>
            <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_s.jpg`}/>
          </li>
        }
      })}
		</section>
  )
}

export default Pics;