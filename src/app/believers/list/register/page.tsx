import CardFormRegister from "@/app/ui/believers/formRegister";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 md:items-center w-screen h-screen  p-2">
      <div className="flex flex-col object-cover rounded-sm border-none">
        <CardFormRegister />
      </div>
    </div>
  );
};

export default RegisterPage;
