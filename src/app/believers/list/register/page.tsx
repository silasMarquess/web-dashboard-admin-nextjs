import BelieverContextProvider from "@/app/contexts/believerContext";
import CardFormRegister from "@/app/ui/believers/formRegister";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-400 md:bg-primary md:items-center w-screen h-screen ">
      <div className="flex flex-col object-cover">
        <BelieverContextProvider>
          <CardFormRegister />
        </BelieverContextProvider>{" "}
      </div>
    </div>
  );
};

export default RegisterPage;
