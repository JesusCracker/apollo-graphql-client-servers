import React, { useContext, useState } from 'react';
import { Form, Input, Button } from "semantic-ui-react";
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


//查询语句
const REGISTER_USER = gql`mutation register(
    $username:String!,
    $email:String!,
    $password:String!,
    $confirmPassword:String!,
){
    register(registerInput: {username:$username,email:$email,password: $password,confirmPassword: $confirmPassword }){
        token,
        username,
    }
}`


const Register = (props) => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    /*
        const [values, setValues] = useState({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    */
    const registerUser = () => {
        addUser();
    }

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    /*
        const onChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value })

        }

        const onSubmit = (e) => {
            e.preventDefault();
            addUser();
        }
    */


    const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            // console.dir(result);
            context.login(userData)
            // props.history.push("/");
            navigate('/');

        },
        onError(err) {
            console.dir(err);
            setErrors(err.message.toString())
        },
        variables: values
    })

    // console.dir(errors);


    return (
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>注册</h1>

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
                    label='邮箱'
                    placeholder='邮箱'
                    name={'email'}
                    value={values.email}
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
                <Form.Field
                    control={Input}
                    label='确认密码'
                    placeholder='确认密码'
                    name={'confirmPassword'}
                    value={values.confirmPassword}
                    onChange={onChange}

                />
                <Form.Field control={Button} primary>Submit</Form.Field>
            </Form>

            {errors && errors.length > 0 && (
                <div className={"ui error message"}>
                    {errors}
                </div>
            )}
        </div>
    );
}
export default Register;