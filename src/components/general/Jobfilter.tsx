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

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  return (
    <Card className="col-span-1 h-fit hover:shadow-lg transition-all duration-300 hover:border-primary">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-semibold text-2xl ">Filters</CardTitle>
        <Button className="h-8" variant="destructive" size="sm">
          <span className="">Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-primary">Job Type</Label>

          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={job} />
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
          <Select>
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
        <Separator/>
        <div className="space-y-2">
                <label className="text-lg font-semibold text-primary">Salary Range</label>
                <Slider defaultValue={[5000]} min={0} max={200000} step={5000} />
                <div className="text-sm text-muted-foreground">{}</div>
              </div>
      </CardContent>
    </Card>
  );
}
