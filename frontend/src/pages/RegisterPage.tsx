import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    // placeholder
    // eslint-disable-next-line no-alert
    alert(`Register: ${JSON.stringify(data)}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-semibold mb-2">Register</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="First name" {...register('firstName')} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Last name" {...register('lastName')} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Email" type="email" {...register('email')} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Password" type="password" {...register('password')} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Create account</button>
    </form>
  );
}

