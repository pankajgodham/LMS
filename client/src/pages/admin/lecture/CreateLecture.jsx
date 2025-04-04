import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateLectureMutation, useGetCourceLectureQuery } from "@/features/api/courceApi";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courceId = params.courceId;
  console.log(courceId);
  
  const [lectureTitle, setLectureTitle] = useState("");

  const navigate = useNavigate();

  const [CreateLecture, { data, isLoading, error, isSuccess }] =useCreateLectureMutation();

    const {data:lectureData,isLoading:lectureLoding,isError:lectureError,refetch}=useGetCourceLectureQuery(courceId);
    console.log(lectureData);
    
  const createLectureHandler = async () => {
    await CreateLecture({ lectureTitle, courceId });
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);

    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    console.log("Fetching Lectures...");
    console.log("Lecture Data:", lectureData);
    console.log("Lecture Loading:", lectureLoding);
    console.log("Lecture Error:", lectureError);
  
    if (lectureError) {
      console.error("Lecture Fetching Error:", lectureError);
    }
  }, [lectureData, lectureLoding, lectureError]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl ">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo,
          molestiae.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courceTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/cources/${courceId}`)}
          >
            Back To Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {
            lectureLoding ?(<p>Loading Lectures...</p>):lectureError?(<p>Failed to Load Lectures</p>):lectureData.lectures.length===0?(<p>No lecture Available</p>)
            :(
            lectureData.lectures.map((lecture,index)=>{
              return <Lecture key={lecture._id} lecture={lecture} courceId={courceId} index={index}/>
            })
            )
          }

        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
