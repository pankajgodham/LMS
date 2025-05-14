import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const COURCE_PROGRESS_API="http://localhost:8080/api/v1/progress"
export const courceProgressApi=createApi({
    reducerPath:"courceProgressApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURCE_PROGRESS_API,
        credentials:"include"

    }),
    endpoints:(builder)=>({
        getCourceProgress:builder.query({
            query:(courceId)=>({
                    url:`/${courceId}`,
                    method:"GET"
            })
        }),
        updateLectureprogress:builder.mutation({
            query:({courceId,lectureId})=>({
                url:`/${courceId}/lecture/${lectureId}/view`,
                method:"POST"
            })
        }),
        completeCource:builder.mutation({
            query:(courceId)=>({
                url:`/${courceId}/complete`,
                    method:"POST"
            })
        }),
        inCompleteCource:builder.mutation({
            query:(courceId)=>({
                url:`/${courceId}/incomplete`,
                    method:"POST"
            })
        }),
    })
})

export const {
useGetCourceProgressQuery,
useUpdateLectureprogressMutation,
useCompleteCourceMutation,
useInCompleteCourceMutation
}=courceProgressApi