"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Divide, Loader2 } from "lucide-react";
import { ReactNode } from "react";

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
