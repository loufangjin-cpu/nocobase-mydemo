// 1、获取token缓存
// 2、存入数据库
import { useAPIClient } from './api-client';

export const setTokenAndSaveSql = () => {
    const api = useAPIClient();
    const tokenLocal = localStorage.getItem('NOCOBASE_TOKEN')
    console.log('token,', tokenLocal)
    api.auth.signUp({
        password: tokenLocal,
        // email: '18892302110@163.com',
        resetToken: tokenLocal
    });
}