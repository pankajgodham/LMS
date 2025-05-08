import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURCE_PURCHASE_API="http://localhost:8080/api/v1/purchase"
export const purchaseApi=createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURCE_PURCHASE_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        createCheckoutSession:builder.mutation({
            query:(courceId)=>({
                url:"/checkout/create-checkout-session",
                method:"POST",
                body:{courceId},
            })
        }),
        getCourceDetailWithStatus:builder.query({
            query:(courceId)=>({
                url:`/cource/${courceId}/detail-with-status`,
                method:"GET"
            })
        }),
        getPurchasedCource:builder.query({
            query:()=>({
                url:`/`,
                method:"GET"
            })
        })
    })
})

export const {
    useCreateCheckoutSessionMutation,
    useGetCourceDetailWithStatusQuery,
    useGetPurchasedCourceQuery,
  } = purchaseApi;