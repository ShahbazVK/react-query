import React from 'react'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

const Home = () => {
    const fetchData = () => {
        return axios
            .get('https://gorest.co.in/public/v2/posts')
            .then((response) => response.data)
            .catch((error) => {
                throw new Error('Failed to fetch users');
            });

    }
    const postData = async (values) => {
        const resp = await axios.post('https://gorest.co.in/public/v2/users/1427/posts', values, {//for post,update,delete request
            headers: {
                Authorization: 'Bearer 5658052a84cfd94b69489ce393ca161aa4404ca632dd0d8bb530717c0c0db617',
            },
        })
        return resp.data
    }
    const fetchQuery = useQuery("postsFetch", fetchData)//for get request
    const postQuery = useMutation("postsAdd", postData)///for post,update,delete request
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, backgroundColor: '#d3d3d3' }}>
                <h1>Get Request with USEQUERY</h1>
                {fetchQuery.isLoading && "loading"}
                {fetchQuery.data && fetchQuery.data.map((el, key) => {
                    return (
                        <div key={key}>
                            <h3>{el.title}</h3>
                            <p>{el.body}</p>
                        </div>
                    )
                })}
            </div>
            <div style={{ flex: 1, backgroundColor: '#f3e2e2' }}>
                <h1>POST Request with USEMUTATION</h1>
                <button onClick={async () => {
                    await postQuery.mutate({ "title": "My New Post", "body": "This is the content of my new post." })//for post,update,delete request
                    console.log("data", postQuery.data)
                }}>Click to mutate!</button>
                {postQuery.isLoading && "loading"}
                {
                    postQuery.data && <div><h1>{postQuery.data.title}</h1> <p>{postQuery.data.body}</p></div>
                }
            </div>

        </div>
    )
}

export default Home







// import React from 'react';
// import axios from 'axios';
// import { useMutation } from 'react-query';

// const createUser = async (userData) => {
//     try {
//         const response = await axios.post('https://gorest.co.in/public-api/users', userData, {
//             headers: {
//                 "Authorization": "Bearer 5658052a84cfd94b69489ce393ca161aa4404ca632dd0d8bb530717c0c0db617"
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to create user');
//     }
// };

// const UserForm = () => {
//     const [formData, setFormData] = React.useState({ gender: "male", status: "active" });
//     const { mutate, isLoading, isError, error, data } = useMutation(createUser, {
//         onSuccess: (createdUser) => {
//             // Do something with the created user data
//             console.log('User created:', createdUser);
//         },
//     });
//     console.log(data)
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // console.log(formData)
//         mutate(formData);
//     };

//     const handleChange = (event) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [event.target.name]: event.target.value,
//         }));
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={handleChange}
//                 />
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Creating...' : 'Create'}
//                 </button>
//             </form>
//             {isError && <div>Error: {error.message}</div>}
//             {data && <div>User created: {data.name}</div>}
//         </div>
//     );
// };

// export default UserForm;





// import React from 'react';
// import { useQuery } from 'react-query';
// import axios from 'axios';

// const fetchUsers = async () => {
//     try {
//         const response = await axios.get('https://gorest.co.in/public-api/users');
//         return response.data.data;
//     } catch (error) {
//         throw new Error('Failed to fetch users');
//     }
// };

// const UserList = () => {
//     const { data, isLoading, isError, error } = useQuery('users', fetchUsers);

//     if (isLoading) {
//         return <div>Loading users...</div>;
//     }

//     if (isError) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div>
//             <h2>User List</h2>
//             {data.map((user) => (
//                 <div key={user.id}>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     <hr />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserList;
