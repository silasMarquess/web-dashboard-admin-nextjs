import AuthContextUserProvider from "@/app/contexts/authcontextUsers";
import LoginForm from "@/app/ui/users/formLogin";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center bg-primary items-center md:bg-primary">
      <div className="justify-center h-auto w-4/5 md:w-[500px] rounded-sm mx-2 shadow-lg">
        <AuthContextUserProvider>
          <LoginForm />
        </AuthContextUserProvider>
      </div>
    </div>
  );
};

export default LoginPage;
