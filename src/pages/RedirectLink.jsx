import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { getLongUrl } from "@/db/apiUrls";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { storeClicks } from "@/db/apiClicks";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="white" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
