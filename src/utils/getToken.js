function getToken()
{
    let authenticated=JSON.parse(localStorage.getItem("authenticated"));
    return authenticated.token;
}