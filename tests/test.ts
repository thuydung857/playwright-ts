type User  = {
    id: number;
    userName: string;
    email: string
}

const userProfile: User = {
    id: 101,
    userName: 'An',
    email: 'An@gmail.com'
}

// const userId = userProfile.id

//destructring 
const {id: userId, userName} = userProfile
console.log(userId);

type Options = {
    url: string;
    method: 'GET' | 'POST'
}

function makeApiCall({url, method = 'GET'}: Options){
    console.log(`Making ${method} request to: ${url}`);

}

const requestOptions: Options = {
    url: '/api/user',
    method: 'POST'
}
makeApiCall(requestOptions)

const toolBoxObject = {

    page: aPageObject,
    context: aBrowserContext 
}