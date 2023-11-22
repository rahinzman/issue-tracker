"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import StatusStyle from "@/components/status-style";
import ViewButton from "@/components/view-button";
import { issuesTypeI } from "@/types/types";

export default function IssuePage() {
  const [data, setData] = useState<issuesTypeI[]>([]);
  useEffect(() => {
    const issues = async () => {
      await axios
        .get("/api/auth/getIssue")
        .then((res: AxiosResponse) => {
          setData(res.data);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    issues();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between py-10 ">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="open">
              <StatusStyle status="Open" />{" "}
            </SelectItem>
            <SelectItem value="closed">
              <StatusStyle status="Closed" />{" "}
            </SelectItem>
            <SelectItem value="inProcess">
              <StatusStyle status="In Process" />{" "}
            </SelectItem>
          </SelectContent>
        </Select>
        <Link href={"/issues/create-Issue"}>
          <Button>Create Issue</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40rem]">Issues</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center w-[5rem]">View</TableHead>
            <TableHead className="text-center w-[5rem]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.title}</TableCell>
              <TableCell className="text-center">
                <StatusStyle status={issue.status} />
              </TableCell>
              <TableCell className="text-center">
                {String(new Date(issue.createdAt)).slice(0, -45)}
              </TableCell>
              <TableCell className="text-center">
                <ViewButton issue={issue} />
              </TableCell>
              <TableCell className="text-center">
                <Link
                  href={{
                    pathname: "/issues/edit-Issue",
                    query: {
                      id: issue.id,
                    },
                  }}
                >
                  <Button>Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
