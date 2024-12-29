"use client";

import { toast } from "sonner";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Switch } from "@highschool/ui/components/ui/switch";

import { Wrapper } from "./wrapper";

const TIMES = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

export const Notification = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState("8AM");

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    toast.success(`Thời gian nhận thông báo đã được đặt lúc ${value}`);
  };

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    toast.success(checked ? "Đã bật thông báo" : "Đã tắt thông báo");
  };

  return (
    <Wrapper
      heading="Lời nhắc học tập"
      description="Chọn thời điểm nhận lời nhắc học tập"
    >
      <div className="flex flex-col items-end gap-2">
        <Switch checked={isEnabled} onCheckedChange={handleToggle} />
        <Select
          value={selectedTime}
          onValueChange={handleTimeChange}
          disabled={!isEnabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            {TIMES.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  );
};
