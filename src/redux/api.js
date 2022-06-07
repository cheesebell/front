import axios from "axios";
const path = process.env.PUBLIC_URL;

export const fetchFlickr = async(opt) => {
    const api_key = '2ded31f6bd2818a5bdf20954d95106f2';
    const method_interest = 'flickr.interestingness.getList';
    // search method 추가
    const method_search = 'filckr.photos.search';
    const method_user = 'flickr.people.getPhotos';
    let url = '';
    
    if (opt.type === 'interest') {
        url =  `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}`;
    }

    if (opt.type === 'search') {
        url =  `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&tags=${opt.tag}`;
    }

    if (opt.type === 'user') {
        url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&user_id=${opt.user}`;
    }
    
    //axios로 반환받은 데이터만 내보내는 순수함수 형태로 코드 변경
    return await axios.get(url);
};

export const fetchYoutube = async () => {
    console.log('fetchYoutube');
    const key = 'AIzaSyA4JSBOYOot3CbalOVi-yn74v4FMmNPmsc';
    const id = 'PLC9z-XDyK2RgktTbTXl8MjyTEdzTAFIT4';
    const num = 7;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${id}&maxResult=${num}&part=snippet`;

    return await axios.get(url);
};


export const fetchMembers = async () => {
    const url = path + '/DB/department.json';
    return await axios.get(url);
}