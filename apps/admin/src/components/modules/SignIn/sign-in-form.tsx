import { Button } from "@highschool/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { cn } from "@highschool/ui/lib/utils";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Chào mừng trở lại</CardTitle>
          <CardDescription>Đăng nhập vào hệ thống quản trị</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email hoặc tên đăng nhập</Label>
                  <Input
                    id="email"
                    type="string"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
