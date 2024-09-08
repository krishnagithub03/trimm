import { supabaseUrl } from "@/db/supabase";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrls } from "@/db/apiUrls";
import { BarLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LinkCard = ({ url, fetchUrls }) => {
  const downloadImg = async () => {
    const imgUrl = url?.qr;
    const fileName = url?.title;
    // const anchor = document.createElement("a");
    // anchor.href = imgUrl;
    // anchor.download = fileName;

    // document.body.appendChild(anchor);
    // anchor.click();
    // document.body.removeChild(anchor);

    const response = await fetch(imgUrl);
    const blob = await response.blob();

    const anchor = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);

    anchor.href = objectUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const {
    data,
    error,
    loading: loadingDelete,
    fn: fnDelete,
  } = useFetch(deleteUrls, url?.id);
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        alt="qr code"
        className="h-32 object-contain ring ring-blue-400 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className=" text-2xl font-bold hover:underline text-blue-500 cursor-pointer">
          https://trimm.me/
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 cursor-pointer hover:underline">
          {url.original_url}
        </span>
        <span className="flex flex-1 items-end font-extralight text-sm">
          {new Date(url.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(`https://trimm.me/${url?.short_url}`);
            toast.success("Link copied to clipboard");
          }}
        >
          <Copy />
          <ToastContainer theme="dark" type="success" />
        </Button>
        <Button onClick={downloadImg}>
          <Download />
        </Button>
        <Button onClick={() => fnDelete().then(() => fetchUrls())}>
          {loadingDelete ? <BarLoader color="hsl(125,82%,50%)" /> : <></>}
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
