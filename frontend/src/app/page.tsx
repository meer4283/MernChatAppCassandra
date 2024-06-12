'use client';


import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Ripple } from 'primereact/ripple';
import { Toast } from 'primereact/toast';
import { features } from 'process';
import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from "lodash";
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoginDetails } from '@/hooks';
import { useHttp } from '@/hooks/useHttp';
import { APP_NAME } from '@/utils/constants';

const LoginPage = () => {
    const { loginUser, userDetail } = useLoginDetails();
    const { loading, error } = userDetail;
    const toast: any = useRef(null);
    const msgs = useRef<any>(null);
    const [checked4, setChecked4] = useState(false);
    const db = new useHttp();
    const router = useRouter();

    const formik: any = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: any = {};

            if (!data.email) {
                errors.email = ' Email is required.';
            } else {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
                    errors.email = 'Invalid Email';
                }
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            login(data);
        }
    });

    const isFormFieldValid = (name: any) => {
        return !!(formik.touched[name] && formik.errors[name]);
    };
    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="block text-red-500 font-semibold">{formik.errors[name]}</small>;
    };

    const login = (data: any) => {
        loginUser(data)
    };

    const features = [
        { title: 'Unlimited Inbox', image: 'live-collaboration.svg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Data Security', image: 'security.svg', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { title: 'Cloud Backup Williams', image: 'subscribe.svg', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
    ];
    React.useEffect(() => {
        if (loading === false && !isEmpty(error)) {
            showMessage('error', 'Error!', error);
        }
    }, [userDetail]);

    useEffect(() => {

        if (userDetail?.isLoggedIn === true) {
            router.push("/dashboard")
        }

        return () => {
        }
    }, [userDetail])


    const showMessage = (severity: string, summary: string, detail: string) => {
        msgs.current?.replace({
            severity: severity,
            summary: summary,
            detail: detail,
            closable: true,
            sticky: true
        });
    };

    return (
        <div style={{ background: 'url("/demo/images/login/signin-bg.jpg") no-repeat', backgroundSize: 'cover' }} className="surface-ground px-4 py-4 md:px-6 lg:px-8 h-screen">
            <div className="flex flex-wrap shadow-2">

                <form onSubmit={formik.handleSubmit} className="w-full lg:w-6 p-4 lg:p-7 surface-card">
                    <div className="flex align-items-center justify-content-between mb-7">
                        <span className="text-2xl font-medium text-900">Sign up to {APP_NAME}</span>


                        <Link href={"/register"} className='font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150'>Sign Up</Link>
                    </div>
                    <Toast ref={toast} />
                    <Messages ref={msgs} />


                    {getFormErrorMessage('name')}

                    <label htmlFor="name" className="block text-900 font-medium mb-2">
                        Email
                    </label>
                    <InputText type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email address" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('email')}

                    <label htmlFor="password" className="block text-900 font-medium mb-2">
                        Password
                    </label>
                    <InputText id="password" name="password" value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="Password" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('password')}



                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" className="mr-2" checked={checked4} onChange={(e: any) => setChecked4(e.checked)} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150">Forgot password?</a>
                    </div>

                    <Button label="Login" type="submit" disabled={loading} className="w-full py-3 font-medium" />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
