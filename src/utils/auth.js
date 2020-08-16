// export function authHeader() {
//     // return authorization header with jwt token
//     let user = JSON.parse(sessionStorage.getItem('user'));

//     if (user && user.token) {
//         return { 'Authorization': 'Bearer ' + user.token };
//     } else {
//         return {};
//     }
// }


export function isAuth() {
    if(sessionStorage.getItem('user') === null) {
        localStorage.removeItem('user')
        const url = window.location.origin + '/login'
        window.location = url
    } 
}
