import React, { useEffect, useRef, useState } from "react";
import { UrlState } from "@/context/context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrls } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const ref = useRef();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid Url")
      .required("Long URL is required"),
    customUrl: Yup.string(),
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const {
    data,
    loading,
    error,
    fn: fnCreateUrl,
  } = useFetch(createUrls, { ...formData, user_id: user?.id });

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formData, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve);
      });

      await fnCreateUrl(blob);
    } catch (e) {
      const errors = {};
      e.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (error == null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="krypton">Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create New Link
          </DialogTitle>
        </DialogHeader>
        {formData?.longUrl ? (
          <QRCode value={formData?.longUrl} size={250} ref={ref} />
        ) : null}
        <Input
          id="title"
          placeholder="URL Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter your original URL"
          value={formData.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">trimm.me</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (Optional)"
            value={formData.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error.message} />}
        <DialogFooter className="sm:justify-start">
          <Button disabled={loading} variant="krypton" onClick={createNewLink}>
            {loading ? <BeatLoader size={10} color="white" /> : "create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
