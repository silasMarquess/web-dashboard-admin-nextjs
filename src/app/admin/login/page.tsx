import FormLoginAdmin from "../../ui/users/formLoginAdmin";
import { parseCookies } from "nookies";
import { redirect } from "next/navigation";

const LoginAdminPage = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-500">
      <FormLoginAdmin></FormLoginAdmin>
    </div>
  );
};

export default LoginAdminPage;
