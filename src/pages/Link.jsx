import { UrlState } from "@/context/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrls, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Location from "@/components/Location";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  const downloadImg = () => {
    const imgUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imgUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    error,
    fn,
    data: url,
  } = useFetch(getUrl, { id, user_id: user.id });

  const {
    loading: loadingStats,
    fn: fnStats,
    data: stats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrls, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);
  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BeatLoader className="mb-4" width={"100%"} color="white" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between ">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer ">
            {url?.title}
          </span>
          <a
            href={`https://trimm.me/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://trimm.me/{link}
          </a>
          <a
            href={`https://trimm.me/${url?.original_url}`}
            target="_blank"
            className=" flex items-center gap-1  hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://trimm.me/${url?.short_url}`
                );
                toast.success("Link copied to clipboard");
              }}
            >
              <Copy />
              <ToastContainer theme="dark" type="success" />
            </Button>
            <Button onClick={downloadImg}>
              <Download />
            </Button>
            <Button onClick={() => fnDelete()}>
              {loadingDelete ? <BarLoader color="hsl(125,82%,50%)" /> : <></>}
              <Trash />
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="qr code"
            className="w-full self-center sm:self-start  object-contain ring ring-blue-400
            p-1"
          />
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false ? "No stats available" : "loading Stats"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
