import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourceMutation,
  useGetCourceByIdQuery,
} from "@/features/api/courceApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourceTab = () => {
  const [input, setInput] = useState({
    courceTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courceLevel: "",
    courcePrice: "",
    courceThumbnail: "",
  });
  const params = useParams();
  const courceId = params.courceId;
  const { data: courceByIdData, isLoading: courceByIdLoading } =
    useGetCourceByIdQuery(courceId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (courceByIdData?.cource) {
      const cource = courceByIdData?.cource;
      setInput({
        courceTitle: cource.courceTitle,
        subTitle: cource.subTitle,
        description: cource.description,
        category: cource.category,
        courceLevel: cource.courceLevel,
        courcePrice: cource.courcePrice,
        courceThumbnail: "",
      });
    }
  }, [courceByIdData]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCource, { data, isLoading, isSuccess, error }] =
    useEditCourceMutation();
  const chcangeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourceLevel = (value) => {
    setInput({ ...input, courceLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courceThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourceHandler = async () => {
    const formdata = new FormData();
    formdata.append("courceTitle", input.courceTitle);
    formdata.append("subTitle", input.subTitle);
    formdata.append("description", input.description);
    formdata.append("category", input.category);
    formdata.append("courceLevel", input.courceLevel);
    formdata.append("courcePrice", input.courcePrice);
    formdata.append("courceThumbnail", input.courceThumbnail);
    console.log(formdata);

    await editCource({ formData: formdata, courceId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "cousce Updated");
    }
    if (error) {
      toast.error(error.data.message || "Error");
    }
  }, [isSuccess, error]);

  if (courceByIdLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
  const isPublished = true;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. click save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-2 gap-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courceTitle"
              value={input.courceTitle}
              onChange={chcangeEventHandler}
              placeholder="full stack developer"
            ></Input>
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={chcangeEventHandler}
              placeholder="Become full stack developer from zero to advance"
            ></Input>
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourceLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="courcePrice"
                value={input.courcePrice}
                onChange={chcangeEventHandler}
                placeholder="199"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
            <Button
              onClick={() => navigate("/admin/cources")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourceHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourceTab;
