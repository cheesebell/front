import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchMembers, fetchYoutube } from './api';
import * as types from './actionType';
import { type } from '@testing-library/user-event/dist/type';

/**
 *  takeLatest : 컴포넌트로부터 데이터변경 요청이 여러번 들어올때 제일 최근 요청 하나만 받는게 (takeEvery: 들어오는 요청을 모두 처리)
    all : 여러개의 함수를 모두 동기적으로 호출
    fork : 여려개의 함수를 비동적으로 호출
    call : 첫번째 인수로 들어온 함수를 호출할때 두번째 인수로 받은 옵션을 적용해서 호출
    put : 리듀서에 데이터 변경 요청 (dispatch와 동일)
 */


// action타입에 따라 실행될 generate함수
// flickr 데이터 요청 및 액션객체 반환
export function* returnFlickr(action) {
    // 예외처리
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ 
            type: types.FLICKR.success, 
            payload: response.data.photos.photo
        });
	} catch (err) {
		yield put({ 
            type: types.FLICKR.error, 
            payload: err 
        });
	}
}

// 요청받은 액션 타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}


export function* returnYoutube() {
    try {
        const response = yield call(fetchYoutube);
        yield put({ 
            type: types.YOUTUBE.succese,
            payload: response.data.items
        });
    } catch (err) {
        yield put({ 
            type: types.YOUTUBE.error,
            payload: err
        })
    }
}

export function* callYoutube() {
    yield takeLatest(types.YOUTUBE.start, returnYoutube);
}


export function* returnMembers() {
    try {
        const response = yield call(fetchMembers);
        yield put({
            type: types.MEMBERS.succese, 
            payload: response.data.data
        });
    } catch(err) {
        yield put({
            type: types.MEMBERS.error, 
            payload: err
        })
    }
}

export function* callMembers() {
    yield takeLatest(types.MEMBERS.start, returnMembers);
}

//reducer에 적용될 rootSage 생성함수
export default function* rootSaga() {
    console.log('rootSaga');
    yield all([
        fork(callFlickr),
        fork(callYoutube),
        fork(callMembers)
    ]);
}



/*
<script>
/*
    warpping 함수 안쪽에서 복수개의 함수를 순차적으로 호출하면서 여러개의 리턴값을 반환받아야 할때

    제너레이터 함수 사용법
    - wrapping함수의 function문 뒤에 * 추가
    - 그 안쪽의 자식 함수 호출문 앞에 yield문 추가
    - wrappinng함수의 리턴값으로 iterable객체 반환
    - 반환된 이터러블 객체에 .next()문으로 순차적으로 호출 가능


function test1() {
    console.log('test1');
    return 'test1';
}
function test2() {
    console.log('test2');
    return 'test2';
}
function test3() {
    console.log('test3');
    return 'test3';
}

function* generator() {
    yield test1();
    yield test2();
    yield test3();
}

const result = generator();
console.log(result);

const a = result.next();
console.log(a);

const b = result.next();
console.log(b);

const c = result.next();
console.log(c);

const d = result.next();
console.log(d);
</script>
*/

/*
    saga흐름 보는 방법
    1- store.js에서 saga -> reducer에 미들웨어 처리
    2- 컴포넌트 파일에서 초기액션객체를 dispatch로 saga.js로 전달
    3- saga.js에서 전달받은 actio데이터를 가공해서 다시 reducer.js에 전달
    4- reducer.js에서 action타입에 따라 데이터 store에 전달
*/