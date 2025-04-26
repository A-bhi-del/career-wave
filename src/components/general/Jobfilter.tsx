"use client";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/countriesList";
import { Slider } from "../ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "../ui/input";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentSalaryRange = searchParams.get("salaryRange")?.split(",").map(Number) || [0, 200000];

  function clearAllFilter() {
    router.push("/");
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChange(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(",");
    router.push(`?${createQueryString("jobTypes", newValue)}`);
  }

  function handleLocationChange(location: string) {
    router.push(`?${createQueryString("location", location)}`);
  }

  function handleSearchChange(searchTerm: string) {
    router.push(`?${createQueryString("search", searchTerm)}`);
  }

  function handleSalaryRangeChange(values: number[]) {
    router.push(`?${createQueryString("salaryRange", values.join(","))}`);
  }

  return (
    <Card className="col-span-1 h-fit hover:shadow-lg transition-all duration-300 hover:border-primary">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-semibold text-2xl ">Filters</CardTitle>
        <Button
          onClick={clearAllFilter}
          className="h-8"
          variant="destructive"
          size="sm"
        >
          <span className="">Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-primary">Search Jobs</Label>
          <Input
            type="text"
            placeholder="Search by job title..."
            value={currentSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <Separator />
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-primary">Job Type</Label>

          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(checked) => {
                    handleJobTypeChange(job, checked as boolean);
                  }}
                  id={job}
                  checked={currentJobTypes.includes(job)}
                />
                <label htmlFor={job} className="text-sm font-semibold">
                  {job}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-primary">Location</Label>
          <Select onValueChange={(location) => {
            handleLocationChange(location);
          }} value={currentLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>World-Wide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>{" "}
                  <span className="pl-2">world-wide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-2">
          <label className="text-lg font-semibold text-primary">
            Salary Range
          </label>
          <Slider 
            defaultValue={currentSalaryRange} 
            min={0} 
            max={200000} 
            step={5000}
            onValueChange={handleSalaryRangeChange}
            value={currentSalaryRange}
          />
          <div className="text-sm text-muted-foreground">
            {currentSalaryRange[0]} - {currentSalaryRange[1]}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
