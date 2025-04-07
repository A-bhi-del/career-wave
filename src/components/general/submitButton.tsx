"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Divide, Heart, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface generalsubmitbuttonprops {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
width?: string;
icon?: ReactNode;
}

export function GeneralSubmitButtons({text, variant, width, icon} : generalsubmitbuttonprops ) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
        {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}


export function SaveJobButton({ savedJob } : { savedJob : boolean}){
  const {pending} = useFormStatus();
  return (
      <Button variant="outline" type="submit" disabled={pending}>
          {pending ? (
            <>
            <Loader2 className="size-4 animate-spin"/>
            </>
          ):(
            <>
            <Heart className={cn(
              savedJob ? 'fill-current text-red-500' : '',
              "size-4 transition-colors"

            )} />
           {savedJob ? "Saved" : "Save Job"}
            </>
          )}
      </Button>
  )
}