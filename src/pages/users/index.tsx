import { useRouter } from 'next/router'
import { UserList } from '@/features/users/components/userList'
import { UserHeader } from '@/features/users/components/userHeader'
import { useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'
import { useRef, useState } from 'react'

export default function UserHomePage() {
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // get users_data
  const { data: users } = useQuery({
    queryKey: ['getUsers', filter],
    queryFn: async () => {
      const res = await fetch('/api/users/getUsers', { method: 'POST' })
      if (res.status === 200) {
        const resData = await res.json()
        const data: any[] = await resData.users
        if (filter === '') {
          return data
        }
        return data.filter(
          (d) =>
            d.email?.includes(filter ?? '') ||
            (d as any).user_name?.includes(filter ?? ''),
        )
      }
      res.status === 401 && router.push('/')
    },
  })
  const columnName: ColumnsType<Record<string, any>> = [
    {
      key: 'user_name',
      title: '名前',
      dataIndex: 'user_name',
    },
    { key: 'email', title: 'メールアドレス', dataIndex: 'email' },
    {
      key: 'organization',
      title: '組織',
      dataIndex: 'tenant_name',
    },
    {
      key: 'last_sign_in_at',
      title: '最終ログイン',
      dataIndex: 'last_sign_in_at',
    },
    {
      key: 'edit_button',
      title: '操作',
      dataIndex: 'id',
      render: (dataIndex: string) => (
        <button
          type="button"
          onClick={async () => {
            await router.push(`/users/userEditPage/${dataIndex}`)
          }}
          className="m-0 p-0 hover:bg-[#B9C3CF]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/edit_icon@2x.png"
            alt="編集アイコン"
            className="w-[1.25rem] m-[0.2rem]"
          />
        </button>
      ),
    },
  ]

  return (
    <>
      <UserHeader />
      <UserList
        columnName={columnName}
        users={users as any[]}
        onSubmit={(e) => {
          e.preventDefault()
          if (filter.length > 0) {
            setFilter('')
          } else {
            setFilter(inputRef.current?.value ?? '')
          }
        }}
        inputRef={inputRef}
        filter={filter}
      />
    </>
  )
}
