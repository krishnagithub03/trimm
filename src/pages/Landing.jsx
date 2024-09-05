import { React, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setUrl] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white font-extrabold text-center">
        The Best URL Shortener you'll ever need 👇
      </h2>
      <form
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Enter a looong URL"
          type="url"
          className="h-full px-4 py-4 flex-1"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="krypton" className="h-full" type="submit">
          Shorten
        </Button>
      </form>
      <img
        src="/banner.png"
        alt="trimm banner"
        className="w-full my-11 md:px-11 rounded-sm"
      />
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I create a shortened URL with trimm?
          </AccordionTrigger>
          <AccordionContent>
            To create a shortened URL, simply paste your long URL into the input
            field on the homepage and click the "Shorten" button. The service
            will generate a unique, shortened link that you can share with
            others. This shortened link will redirect users to the original URL
            when clicked.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Can I customize the shortened URL?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our service allows you to customize the end of your shortened
            URL with a custom slug. Instead of a random string, you can choose a
            meaningful word or phrase that is easy to remember and share. Just
            enter your desired slug in the customization field before shortening
            the URL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            How can I track the performance of my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            Our URL shortening service provides analytics for each shortened
            link you create. You can log in to your account and view detailed
            statistics such as the number of clicks, the geographic location of
            users, the devices used, and the sources of the clicks. This data
            helps you monitor the effectiveness of your links and optimize your
            campaigns.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
