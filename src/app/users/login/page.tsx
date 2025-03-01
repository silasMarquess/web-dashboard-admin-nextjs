import LoginForm from "@/app/ui/users/formLogin";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center bg-gray-200 items-center md:bg-primary">
      <div className="justify-center h-auto w-4/5 md:w-[500px] rounded-sm mx-2 shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
