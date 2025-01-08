"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Card } from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { Slider } from "@highschool/ui/components/ui/slider";

import { IconClockFilled } from "@tabler/icons-react";

import { useCreateRoomMutation } from "@/app/api/ket/query";
import { ButtonKet } from "@/components/ui/button";
import { SettingItem } from "@/components/ui/setting-item";

export default function SettingModule() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    randomQuestions: true,
    lateJoining: true,
    randomNames: true,
    studentAccounts: true,
    questionCount: 10,
  });

  const { mutateAsync, isPending } = useCreateRoomMutation();

  const handleHostGame = async () => {
    try {
      const res = await mutateAsync({
        data: { ketId: "2d94f6bf-283e-4a58-a61c-a55122643d89" },
      });
      if (res.status == 201) {
        router.push(`/host/join?id=${res.data?.id}`);
      } else {
        alert(`${res.message}`);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#2DD8E3] bg-opacity-20 py-8">
      <h1 className="mb-4 text-4xl font-bold text-[#7c2280]">Coolket</h1>

      <Card className="shadow-inset-gray-shadow w-full max-w-2xl overflow-hidden rounded-lg bg-white">
        <div className="shadow-inset-gray-shadow-md bg-purple-600 p-4 text-center">
          <h2 className="py-2 text-3xl font-bold text-white">vnr202</h2>
        </div>

        <div className="space-y-6 p-6">
          <ButtonKet
            className="w-full bg-[#2DD8E3] py-8 text-[1.8rem] hover:bg-[#2DD8E3]/90"
            onClick={handleHostGame}
            isDisabled={isPending}
          >
            Host Now
          </ButtonKet>

          <div className="flex w-full gap-4">
            <ButtonKet className="flex h-fit flex-col space-y-1 px-1">
              <IconClockFilled style={{ width: "4rem", height: "4rem" }} />
              <span className="text-3xl">Score</span>
              <span className="text-ellipsis text-wrap">
                The players have highest score (correct answer) is winner
              </span>
            </ButtonKet>
            <ButtonKet className="flex h-fit flex-col space-y-1">
              <IconClockFilled style={{ width: "4rem", height: "4rem" }} />
              <span className="text-3xl">Score</span>
              <span className="text-ellipsis text-wrap">
                The players have highest score (correct answer) is winner
              </span>
            </ButtonKet>
          </div>

          <div className="space-y-6">
            <h3 className="animation-hover border-b pb-2 text-center text-3xl font-semibold">
              Game Settings
            </h3>

            <div className="space-y-6">
              <SettingItem
                title="Random Question Order"
                checked={settings.randomQuestions}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, randomQuestions: checked }))
                }
              />

              <SettingItem
                title="Allow Late Joining"
                checked={settings.lateJoining}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, lateJoining: checked }))
                }
              />

              <SettingItem
                title="Use Random Names"
                checked={settings.randomNames}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, randomNames: checked }))
                }
              />

              <SettingItem
                title="Allow Student Accounts"
                description="Disabling this option will hide account creation options from students (enabled is recommended)"
                checked={settings.studentAccounts}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, studentAccounts: checked }))
                }
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-2xl font-medium">
                    Number of Questions
                  </Label>
                  <ButtonKet
                    className="flex-none px-2 py-4 text-[0.8rem]"
                    heightShadow="-6px"
                  >
                    Preview
                  </ButtonKet>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider
                      value={[settings.questionCount]}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          questionCount: value[0],
                        }))
                      }
                      max={20}
                      min={1}
                      step={1}
                      className="bg-[#2DD8E3]"
                    />
                  </div>
                  <div className="flex h-10 w-16 items-center justify-center rounded border">
                    <Input
                      value={settings.questionCount}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          questionCount: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
