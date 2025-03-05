import FormLoginAdmin from "../../ui/users/formLoginAdmin";
import { parseCookies } from "nookies";
import { redirect } from "next/navigation";

function TokenAdmin() {
  console.log("executa ante da renderização");
  const { token_admin } = parseCookies();
  if (!!token_admin) redirect("/admin/users");
}

const LoginAdminPage = () => {
  TokenAdmin();
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-500">
      <FormLoginAdmin></FormLoginAdmin>
    </div>
  );
};

export default LoginAdminPage;
