import React from "react";
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

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="krypton">Create Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Create New Link
            </DialogTitle>
          </DialogHeader>
          <Input id="title" placeholder="URL Title" />
          <Error message={"Error"} />

          <Input id="short" placeholder="Enter your original URL" />
          <Error message={"Error"} />
          <div className="flex items-center gap-2">
            <Card className="p-2">trimm.me</Card> /
            <Input id="title" placeholder="Custom Link (Optional)" />
          </div>
          <Error message={"Error"} />
          <DialogFooter className="sm:justify-start">
            <Button variant="krypton">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
