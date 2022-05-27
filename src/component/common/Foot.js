import React from 'react';
import { useSelector } from 'react-redux';

function Foot() {
  const path = process.env.PUBLIC_URL;
  const members = useSelector((store) => store.memberReducer.members);

  return (
    <footer>
      2022 CHESSEBELL &copy; ALL RIGHTS RESERVED.
      <div className='members'>
        {members.map((member, idx) => {
          <img key={idx} src={`${path}/img/${member.pic}`} />
        })}
      </div>
    </footer>
  )
}

export default Foot;