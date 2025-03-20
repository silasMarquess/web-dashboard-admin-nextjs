import { ShieldUser, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { parseCookies } from "nookies";

export default function Home() {
  const { token, token_admin } = parseCookies();
  return (
    <div className="flex flex-col  bg-slate-100 h-screen w-screen  items-center justify-center">
      {/*menu */}
      <h1 className="font-bold text-lg">Menu Rapido</h1>
      <div className="flex flex-col aspect-square p-6 gap-1 w-1/2 md:w-[300px] md:flex-row  shadow-xl rounded items-center justify-center border bg-white ">
        <div className="flex flex-col gap-1 justify-center w-24 items-center h-auto p-5 bg-primary rounded-xl">
          <Link
            href={!token_admin ? `/admin/users` : `/admin/login`}
            className="items-center flex flex-col justify-center object-cover"
          >
            <ShieldUser size={32} color="white"></ShieldUser>
            <span className="text-sm text-white">Admin</span>
          </Link>
        </div>

        <div className="flex flex-col gap-1 h-auto justify-center w-24 items-center p-5 bg-primary rounded-lg">
          <Link
            href={!token ? `/believers/list` : `/users/login`}
            className="items-center flex flex-col justify-center object-cover"
          >
            <UserRoundCog size={32} color="white"></UserRoundCog>
            <span className="text-sm text-white">Membros</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
