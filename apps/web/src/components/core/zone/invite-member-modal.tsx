import { Modal } from "@highschool/components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { InviteMemberRole } from "@highschool/interfaces";
import { useInviteMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { ImportTermTextArea } from "../editor/term/import-term-textarea";

import { MemberRoleSelect } from "./member-role-select";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  zoneId: string;
}

interface InviteMemberFormInputs {
  emails: string | string[];
  role: InviteMemberRole;
  sendEmails: boolean;
}

const requiredEmail = () =>
  z
    .string()
    .nonempty({ message: "Email không được để trống" })
    .email({ message: "Email không hợp lệ" });

const schema = () =>
  z.object({
    emails: z.union([
      requiredEmail(),
      z.array(requiredEmail()).nonempty("Danh sách email không được để trống"),
    ]),
    role: z.nativeEnum(InviteMemberRole, {
      errorMap: () => ({ message: "Vui lòng chọn vai trò" }),
    }),
    sendEmails: z.boolean(),
  });

export const InviteMemberModal = ({
  isOpen,
  onClose,
  zoneId,
}: InviteMemberModalProps) => {
  const queryClient = useQueryClient();
  const inviteMemberFormMethods = useForm<InviteMemberFormInputs>({
    defaultValues: {
      emails: "",
      role: InviteMemberRole.Student,
      sendEmails: true,
    },
    resolver: zodResolver(schema()),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = inviteMemberFormMethods;

  const apiInviteMember = useInviteMutation();

  //   const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
  //     const target = e.target as HTMLInputElement;

  //     if (!target.files?.length) return;

  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const content = e?.target?.result as string;
  //       const emails = content
  //         ?.split(",")
  //         .map((email) => email.trim().toLowerCase());

  //       inviteMemberFormMethods.setValue("emails", emails);
  //     };

  //     reader.readAsText(target.files[0]!);
  //   };

  const onSubmit: SubmitHandler<InviteMemberFormInputs> = async (data) => {
    try {
      const emails = Array.isArray(data.emails) ? data.emails : [data.emails];

      const formattedData = {
        members: emails.map((email) => ({
          email: email,
          type: data.role,
        })),
      };

      apiInviteMember.mutateAsync(
        {
          zoneId: zoneId,
          members: formattedData.members,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ["zone-member", zoneId],
            });
            toast.success(data.message);
            inviteMemberFormMethods.reset();
            onClose();
          },
        },
      );
      console.log("Form submitted with data:", formattedData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    handleSubmit(onSubmit)(e);
  };

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setTabIndex(0);
      inviteMemberFormMethods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const importRef = useRef<HTMLInputElement | null>(null);

  return (
    <Modal
      buttonLabel="Mời"
      isOpen={isOpen}
      title="Mời thành viên"
      onClose={onClose}
      onConfirm={() => handleSubmit(onSubmit)()}
    >
      <Form {...inviteMemberFormMethods}>
        <form noValidate className="pb-6" onSubmit={onFormSubmit}>
          <Tabs
            className="flex flex-col gap-6"
            defaultValue="single"
            onValueChange={(value) => setTabIndex(value === "single" ? 0 : 1)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                className="flex flex-row items-center gap-2"
                value="single"
              >
                <IconUser size={16} />
                Mời 1 người
              </TabsTrigger>
              <TabsTrigger
                className="flex flex-row items-center gap-2"
                value="multiple"
              >
                <IconUsers size={16} />
                Mời nhiều người
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="single">
              <div className="flex flex-col gap-6">
                <FormField
                  control={inviteMemberFormMethods.control}
                  name="emails"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-500">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="focus-within:border-primary h-10 border border-gray-200 !text-base transition-all duration-200 focus-within:border-2 focus-visible:ring-0 dark:border-gray-800/50"
                          placeholder="email@example.com"
                          value={typeof value === "string" ? value : ""}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage>{errors.emails?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteMemberFormMethods.control}
                  name="role"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-normal text-gray-500">
                        Vai trò người dùng
                      </FormLabel>
                      <FormControl>
                        <MemberRoleSelect value={value} onChange={onChange} />
                      </FormControl>
                      <FormMessage>{errors.emails?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="multiple">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={inviteMemberFormMethods.control}
                    name="emails"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-normal text-gray-500">
                          Mời qua email
                        </FormLabel>
                        <FormControl>
                          <ImportTermTextArea
                            allowTab={false}
                            className="min-h-[120px]"
                            defaultValue={value}
                            placeholder={`email-1@gmail.com, email-2@gmail.com`}
                            onChange={(e) => {
                              const values = e.target.value
                                .toLowerCase()
                                .split(",");

                              const emails =
                                values.length == 1
                                  ? values[0]!.trim()
                                  : values.map((v) => v.trim());

                              onChange(emails);
                            }}
                          />
                        </FormControl>
                        <FormMessage>{errors.emails?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  {/* <Button
                    color="gray"
                    variant="outline"
                    onClick={() => {
                      if (importRef.current) importRef.current.click();
                    }}
                  >
                    <IconUpload size={18} />
                    Tải lên file .csv
                  </Button>
                  <input
                    ref={importRef}
                    hidden
                    accept=".csv"
                    id="bulkImport"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => {
                      if (e) handleFileUpload(e);
                    }}
                  /> */}
                </div>
                <FormField
                  control={inviteMemberFormMethods.control}
                  name="role"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-normal text-gray-500">
                        Vai trò người dùng
                      </FormLabel>
                      <FormControl>
                        <MemberRoleSelect value={value} onChange={onChange} />
                      </FormControl>
                      <FormMessage>{errors.emails?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </Modal>
  );
};
