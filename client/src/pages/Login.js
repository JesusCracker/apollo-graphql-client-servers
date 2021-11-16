import React, { useState, useContext } from 'react';
import { Button, Form, Input } from "semantic-ui-react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
    gql
} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";


const USER_LOGIN = gql`mutation login($username:String!,$password:String!)
{
    login(loginInput:{username: $username,password: $password} ){
        token,
        username
    }
}`


const Login = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    /*
        const onSubmit = (e) => {
            e.preventDefault();
            userLogin();
        }

        const onChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value })
        }
    */

    const loginUser = () => {
        userLogin();
    }

    const { onChange, onSubmit, values } = useForm(loginUser, {
        username: "",
        password: "",
    })


    const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN, {
        //result是成功后返回的值
        update(_, { data: { login: userData } }) {
            context.login(userData)
            navigate('/');
        },
        onError(err) {
            // console.dir(err);
            setErrors(err.message.toString())
        },
        variables: values
    })


    return (
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>登陆</h1>

                <Form.Field
                    name={'username'}
                    control={Input}
                    label='用户名'
                    placeholder='用户名'
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Field
                    control={Input}
                    label='密码'
                    placeholder='密码'
                    name={'password'}
                    value={values.password}
                    onChange={onChange}

                />

                <Form.Field control={Button} primary>登陆</Form.Field>
            </Form>
            {errors && errors.length > 0 && (
                <div className={"ui error message"}>
                    {errors}
                </div>
            )}
        </div>
    );
}

export default Login;