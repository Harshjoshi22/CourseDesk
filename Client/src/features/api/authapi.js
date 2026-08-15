import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userloggedin ,userloggedout} from "../authslice.js";


const User_api = `${import.meta.env.VITE_API_URL}/user/`;

export const authapi = createApi({
    reducerPath: "authapi",
    baseQuery: fetchBaseQuery({
        baseUrl: User_api,
        credentials: "include",
    }),
    endpoints: (builder) => ({
       registeruser: builder.mutation({
  query: (inputdata) => ({
    url: "register",
    method: "POST",
    body: {
      name: inputdata?.name || "",
      email: inputdata?.email || "",
      password: inputdata?.password || "",
      phoneNumber: inputdata?.phoneNumber || "",
      dateOfBirth: inputdata?.dateOfBirth || "",
      gender: inputdata?.gender || "",
      address: inputdata?.address || "",
      city: inputdata?.city || "",
      state: inputdata?.state || "",
      pinCode: inputdata?.pinCode || "",
      country: inputdata?.country || "India",
    },
  }),
}),
        loginuser: builder.mutation({
            query: (inputdata) => ({
                url: "login",
                method: "POST",
                body: {
                    email: inputdata?.email || "",
                    password: inputdata?.password || "",
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userloggedin({ user: result.data.user }));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
        }),
         logoutuser:builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userloggedout());
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },
         }),

        loaduser:builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userloggedin({ user: result.data.user }));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            },
            
        }),
        checkSession: builder.query({
    query: () => ({
        url: "session",
        method: "GET",
    }),

    async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
            const { data } = await queryFulfilled;

            if (data.authenticated) {
                dispatch(userloggedin({ user: data.user }));
            }
        } catch (err) {
            //nothing just guest
        }
    },
}),
        updateuser:builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body:formData,
                credentials: "include",
        })
    })
    }),
});

export const {useCheckSessionQuery, useRegisteruserMutation, useLoginuserMutation,useLogoutuserMutation,useLoaduserQuery,useUpdateuserMutation } = authapi;
