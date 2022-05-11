import Layout from '../common/Layout';

function Join() {

    return (
        // Layout컴포넌트로 Join전용 컨텐츠를 wrapping
        <Layout name={'Join'}>
            <form>
                <legend>회원가입 폼</legend>
                <table>
                    <caption>회원가입</caption>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor='userid'>ID</label>
                            </th>
                            <td>
                                <input
                                    type='text'
                                    id='userid'
                                    name='userid'
                                    placeholder='아이디를 입력하세요'
                                />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan='2'>
                                <input type='reset' value='cancel'/>
                                <input type='submit' value='send'/>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </form>
        </Layout>
    )
}

export default Join;