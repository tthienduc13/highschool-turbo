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
import { IconUpload, IconUser, IconUsers } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { MemberRole } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";

import { ImportTermTextArea } from "../editor/term/import-term-textarea";

import { MemberRoleSelect } from "./member-role-select";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  zoneId: string;
}

interface InviteMemberFormInputs {
  emails: string | string[];
  role: MemberRole;
  sendEmails: boolean;
}

const requiredEmail = () =>
  z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email" });

const schema = () =>
  z.object({
    emails: z.union([
      requiredEmail(),
      z.array(requiredEmail()).nonempty("Emails are required"),
    ]),
    role: z.enum(["Member", "Admin", "Owner"]),
    sendEmails: z.boolean(),
  });

export const InviteMemberModal = ({
  isOpen,
  onClose,
  zoneId,
}: InviteMemberModalProps) => {
  const inviteMemberFormMethods = useForm<InviteMemberFormInputs>({
    defaultValues: {
      emails: "",
      role: MemberRole.Student,
      sendEmails: true,
    },
    resolver: zodResolver(schema()),
  });
  const {
    formState: { errors },
  } = inviteMemberFormMethods;

  //   const inviteMember = api.organizations.inviteMember.useMutation({
  //     onSuccess: async () => {
  //       await utils.organizations.get.invalidate();
  //       onClose();
  //     },
  //   });

  const inviteMember = () => {};

  //   const createInvite = api.organizations.createInvite.useMutation({
  //     onSuccess: async (token) => {
  //       await copyInviteLink(token);
  //       await utils.organizations.get.invalidate();
  //     },
  //   });

  const createInvite = () => {};

  //   const copyInviteLink = async (providedToken?: string) => {
  //     await navigator.clipboard.writeText(
  //       `${env.NEXT_PUBLIC_APP_URL}/orgs?token=${providedToken || token || ""}`,
  //     );
  //     toast({
  //       title: "Invite link copied to clipboard",
  //       status: "success",
  //       icon: <AnimatedCheckCircle />,
  //       render: Toast,
  //     });
  //   };

  const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.files?.length) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e?.target?.result as string;
      const emails = content
        ?.split(",")
        .map((email) => email.trim().toLowerCase());

      inviteMemberFormMethods.setValue("emails", emails);
    };

    reader.readAsText(target.files[0]!);
  };

  const onSubmit: SubmitHandler<InviteMemberFormInputs> = async (data) => {
    // await inviteMember.mutateAsync({
    //   orgId,
    //   emails: Array.isArray(data.emails) ? data.emails : [data.emails],
    //   role: data.role,
    //   sendEmail: data.sendEmails,
    // });
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
    <Modal isOpen={isOpen} title="Mời thành viên" onClose={onClose}>
      <Form {...inviteMemberFormMethods}>
        <form
          className="pb-6"
          onSubmit={inviteMemberFormMethods.handleSubmit(onSubmit)}
        >
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
                  <Button
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
                  />
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
