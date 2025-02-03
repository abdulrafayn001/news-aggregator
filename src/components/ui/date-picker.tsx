"use client"

import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { Button } from "./button"
import { cn } from "../../lib/utils"
import { Calendar } from "./calendar"
import React from "react"
import { DateRange } from "react-day-picker"
"use client"


interface DatePickerWithRangeProps {
  className?: string;
  date?: DateRange | undefined;
  onSelect?: (date: DateRange | undefined) => void;
  disabled?: (date: Date) => boolean;
}

export function DatePickerWithRange({
  className,
  date,
  onSelect,
  disabled,
}: DatePickerWithRangeProps) {

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <div className="flex-1 flex justify-between items-center">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
              {date && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(undefined);
                  }}
                  className="ml-2 hover:bg-gray-100 rounded-full p-1"
                >
                  <X className="h-4 w-4 text-gray-800" />
                </button>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            disabled={disabled}
          />

        </PopoverContent>
      </Popover>
    </div>
  );
}

