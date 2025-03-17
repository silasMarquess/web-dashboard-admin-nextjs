import { ShieldUser, UserRoundCog } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col  bg-slate-100 h-screen w-screen  items-center justify-center">
      {/*menu */}
      <h1 className="font-bold text-lg">Menu Rapido</h1>
      <div className="flex flex-col aspect-square p-6 gap-1 w-1/2 md:w-[300px] md:flex-row  shadow-xl rounded items-center justify-center border bg-white ">
        <div className="flex flex-col gap-1 justify-center items-center h-auto p-5 bg-primary rounded-xl">
          <Link href="/admin/login">
            <ShieldUser size={32} color="white"></ShieldUser>
          </Link>
          <span className="text-sm text-white">Admin</span>
        </div>
        <div className="flex flex-col gap-1 h-auto justify-center items-center p-5 bg-primary rounded-lg">
          <Link href="/users/login">
            <UserRoundCog size={32} color="white"></UserRoundCog>
          </Link>
          <span className="text-sm text-white">Admin</span>
        </div>
      </div>
    </div>
  );
}
