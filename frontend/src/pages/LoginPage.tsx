import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    // placeholder
    // eslint-disable-next-line no-alert
    alert(`Login: ${JSON.stringify(data)}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="Email" type="email" {...register('email')} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Password" type="password" {...register('password')} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
}

