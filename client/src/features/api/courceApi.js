import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURCE_API="http://localhost:8080/api/v1/cource"
export const CourceApi=createApi({
    reducerPath:"courceApi",
    tagTypes:['Refetch_Creator_Cource'],
    baseQuery:fetchBaseQuery({
        baseUrl:COURCE_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        createCource:builder.mutation({
            query:({courceTitle,category})=>({
                url:"",
                method:"POST",
                body:{courceTitle,category}
            }),
            invalidatesTags:["Refetch_Creator_Cource"]
        }),
         getCreatorCource:builder.query({
            query:()=>({
                url:"",
                method:"GET",
               
            }),
            providesTags:["Refetch_Creator_Cource"]
        }),
        editCource:builder.mutation({
            query:({formData,courceId})=>({
                url:`/${courceId}`,
                method:"PUT",
                body:formData
               
            }),
            invalidatesTags:["Refetch_Creator_Cource"]
        }),
        getCourceById:builder.query({
            query:(courceId)=>({
                url:`/${courceId}`,
                method:"GET",

            })
        }),
        createLecture:builder.mutation({
            query:({lectureTitle,courceId})=>({
                url:`/${courceId}/lecture`,
                method:"POST",
                body:{lectureTitle}
            })
        }),
        getCourceLecture: builder.query({
            query: (courceId) => ({
              url: `/${courceId}/lecture`, // Ensure the correct route
              method: "GET",
            }),
            transformResponse: (response) => response || { lectures: [] }, // Ensure data is always returned
          }),
      editLecture:builder.mutation({
        query:({courceId,lectureId,lectureTitle,videoInfo,isPreviewFree})=>({
            url:`/${courceId}/lecture/${lectureId}`,
            method:"POST",
            body:{lectureTitle,videoInfo,isPreviewFree}
        })
      })  
    })
});
export const {useCreateCourceMutation,
    useGetCreatorCourceQuery,
    useEditCourceMutation,
    useGetCourceByIdQuery,
    useCreateLectureMutation,
    useGetCourceLectureQuery,
    useEditLectureMutation}=CourceApi