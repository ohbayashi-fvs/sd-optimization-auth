import type { Login } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>()

  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmitLoginButton = async (val: Login) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: val.email, password: val.password }),
    })

    if (res.status === 200) {
      router.push('/users')
    }
    if (res.status === 401) {
      const response = await res.json()
      if (response.hasOwnProperty('message')) setError(response.message)
      if (response.hasOwnProperty('ipAddress1'))
        setError(
          '以下のIPアドレスは登録されていません。「' +
            response.ipAddress1 +
            ', ' +
            response.ipAddress2 +
            '」。システム開発者にご連絡ください。',
        )
    }
  }

  return (
    <section className="m-[30vh] flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmitLoginButton)}
        className="flex w-[20rem] flex-col gap-2 text-[1.2rem]"
      >
        <label className="block text-gray-700 text-sm font-bold">
          メールアドレス
        </label>
        <input
          {...register('email', { required: true })}
          name="email"
          type="email"
          autoComplete="email"
          className="h-[1.5rem] rounded border-solid border-main p-2 text-[1.2rem]"
        />
        {errors.email && errors.email.message}
        <label className="block text-gray-700 text-sm font-bold mt-3">
          パスワード
        </label>
        <input
          {...register('password', { required: true })}
          name="password"
          type="password"
          autoComplete="password"
          className="h-[1.5rem] rounded border-solid border-main p-2 text-[1.2rem]"
        />
        {errors.password && errors.password.message}
        <button
          type="submit"
          className="mx-auto mt-8 w-40 rounded bg-main text-white"
        >
          ログイン
        </button>
      </form>
      <span className="text-error">{error}</span>
    </section>
  )
}
